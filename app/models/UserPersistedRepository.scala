package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserPersistedRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  class UserTable(tag: Tag) extends Table[UserPersisted](tag, "user") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def firstName = column[String]("firstName")

    def lastName = column[String]("lastName")

    def email = column[String]("email")

    def admin = column[Boolean]("admin")

    def * = (id, firstName, lastName, email, admin) <> ((UserPersisted.apply _).tupled, UserPersisted.unapply)

  }

  private val user = TableQuery[UserTable]

  def create(firstName: String, lastName: String, email: String, admin: Boolean): Future[UserPersisted] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (user.map(u => (u.firstName, u.lastName, u.email, u.admin))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning user.map(_.id)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into { case ((firstName, lastName, email, admin), id) => UserPersisted(id, firstName, lastName, email, admin) }
      // And finally, insert the person into the database
      ) += (firstName, lastName, email, admin)
  }

  def list(): Future[Seq[UserPersisted]] = db.run {
    user.result
  }

  def getUser(id: Long): Future[Seq[UserPersisted]] = db.run {
    user.filter(_.id === id).result
  }
}