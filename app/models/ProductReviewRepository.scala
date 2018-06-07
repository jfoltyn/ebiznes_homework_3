package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.lifted.ProvenShape

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductReviewRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, userRepository: UserRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  import userRepository.UserTable
  class ProductReviewTable(tag: Tag) extends Table[ProductReview](tag, "product_review") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def review = column[String]("review")

    def userId = column[Long]("userId")

    def productId = column[Long]("productId")

    def * : ProvenShape[ProductReview] = (id, review, userId, productId) <> ((ProductReview.apply _).tupled, ProductReview.unapply)

  }

  val productReview = TableQuery[ProductReviewTable]

  import userRepository.UserTable
  private val user = TableQuery[UserTable]

  def create(review: String, userId: Long, productId: Long): Future[ProductReview] = db.run {
    (productReview.map(o => (o.review, o.userId, o.productId))
      returning productReview.map(_.id)
      into { case ((review, userId, productId), id) => ProductReview(id, review, userId, productId) }

      ) += (review, userId, productId)
  }

  def list(): Future[Seq[ProductReview]] = db.run {
    productReview.result
  }

  private val productReviewQuery = (productId: Long) => for {
    (pr, u) <- productReview.filter(_.productId === productId) join user on (_.userId === _.id)
  } yield (pr, u)

  def getProductReview(productId: Long): Future[Seq[(ProductReview, User)]] = db.run {
    productReviewQuery(productId).result
  }
}