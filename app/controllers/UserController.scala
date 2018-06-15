package controllers

import javax.inject._
import models._
import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(userRepo: UserPersistedRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addUser(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val orderFromJson: JsResult[UserPersisted] = Json.fromJson[UserPersisted](request.body)

    orderFromJson match {
      case JsSuccess(o: UserPersisted, path: JsPath) =>
        userRepo.create(o.firstName, o.lastName, o.email, o.admin).map { _ => Ok }
      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }

  }

  def getUsers: Action[AnyContent] = Action.async { implicit request =>
    userRepo.list().map { user =>
      Ok(toJson(user))
    }
  }
}