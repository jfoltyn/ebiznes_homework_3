package controllers

import javax.inject._
import models._
import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}


class ProductReviewController @Inject()(productReviewRepository: ProductReviewRepository, cc: MessagesControllerComponents
                                       )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addReview(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val reviewFromJson: JsResult[ProductReview] = Json.fromJson[ProductReview](request.body)

    reviewFromJson match {
      case JsSuccess(r: ProductReview, path: JsPath) =>
        productReviewRepository.create(r.review, r.userId, r.productId).map { _ => Ok }

      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }

  }

  def getReviews: Action[AnyContent] = Action.async { implicit request =>
    productReviewRepository.list().map { order =>
      Ok(toJson(order))
    }
  }
}