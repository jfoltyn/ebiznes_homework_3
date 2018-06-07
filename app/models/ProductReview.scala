package models

import play.api.libs.json._

case class ProductReview(id: Long, review: String, userId: Long, productId: Long)

object ProductReview {
  implicit val orderedFormat = Json.format[ProductReview]
}


case class ProductReviewResponse(id: Long, review: String, user: String)
object ProductReviewResponse {
  implicit val orderedFormat = Json.format[ProductReviewResponse]
}