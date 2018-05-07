package models

import play.api.libs.json._

case class User(id: Long, firstName: String, lastName: String, address: String, admin: Boolean)

object User {
  implicit val userFormat = Json.format[User]
}