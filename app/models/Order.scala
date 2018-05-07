package models

import play.api.libs.json._

case class Order(id: Long, timeStamp: String, amount: Float, userId: Long, productId: Long, address: String, dateSend: String, datePaid: String)

object Order {
  implicit val orderedFormat = Json.format[Order]
}
