package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.lifted.ProvenShape

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class OrderTable(tag: Tag) extends Table[Order](tag, "order") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def timeStamp = column[String]("timeStamp")

    def amount = column[Float]("amount")

    def userId = column[Long]("userId")

    def productId = column[Long]("productId")

    def address = column[String]("address")

    def dateSend = column[String]("dateSend")

    def datePaid = column[String]("datePaid")

    def * : ProvenShape[Order] = (id, timeStamp, amount, userId, productId, address, dateSend, datePaid) <> ((Order.apply _).tupled, Order.unapply)

  }

  val order = TableQuery[OrderTable]

  def create(timeStamp: String, amount: Float, userId: Long, productId: Long, address: String, dateSend: String, datePaid: String): Future[Order] = db.run {
    (order.map(o => (o.timeStamp, o.amount, o.userId, o.productId, o.address, o.dateSend, o.datePaid))
      returning order.map(_.id)
      into { case ((timeStamp, amount, userId, productId, address, dateSend, datePaid), id) => Order(id, timeStamp, amount, userId, productId, address, dateSend, datePaid) }

      ) += (timeStamp, amount, userId, productId, address, dateSend, datePaid)
  }

  def list(): Future[Seq[Order]] = db.run {
    order.result
  }
}