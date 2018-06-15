package models

import com.mohiva.play.silhouette.api.LoginInfo
import play.api.libs.json._

case class UserPersisted(id: Long, firstName: String, lastName: String, email: String, admin: Boolean)

object UserPersisted {
  implicit val userFormat = Json.format[UserPersisted]
}