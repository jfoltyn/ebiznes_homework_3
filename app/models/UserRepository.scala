package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  class UserTable(tag: Tag) extends Table[User](tag, "user") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def firstName = column[String]("firstName")

    def lastName = column[String]("lastName")

    def address = column[String]("address")

    def admin = column[Boolean]("admin")

    def * = (id, firstName, lastName, address, admin) <> ((User.apply _).tupled, User.unapply)

  }

  private val user = TableQuery[UserTable]

  def create(firstName: String, lastName: String, address: String, admin: Boolean): Future[User] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (user.map(u => (u.firstName, u.lastName, u.address, u.admin))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning user.map(_.id)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into { case ((firstName, lastName, address, admin), id) => User(id, firstName, lastName, address, admin) }
      // And finally, insert the person into the database
      ) += (firstName, lastName, address, admin)
  }

  def list(): Future[Seq[User]] = db.run {
    user.result
  }
}