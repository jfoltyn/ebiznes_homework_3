package controllers

import javax.inject._
import models._
import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(userRepo: UserRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addUser(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val orderFromJson: JsResult[User] = Json.fromJson[User](request.body)

    orderFromJson match {
      case JsSuccess(o: User, path: JsPath) =>
        userRepo.create(o.firstName, o.lastName, o.address, o.admin).map { _ => Ok }
      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }

  }

  def getUsers: Action[AnyContent] = Action.async { implicit request =>
    userRepo.list().map { user =>
      Ok(toJson(user))
    }
  }
}