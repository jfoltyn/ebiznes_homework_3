package controllers

import javax.inject._
import models._
import play.api.libs.json.Json.toJson
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{ExecutionContext, Future}


class OrderController @Inject()(orderRepo: OrderRepository, productsRepo: ProductRepository, categoryRepo: CategoryRepository,
                                cc: MessagesControllerComponents
                               )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  import play.api.libs.json.Json

  def addOrder(): Action[JsValue] = Action.async(parse.json) { implicit request =>

    val orderFromJson: JsResult[Order] = Json.fromJson[Order](request.body)

    orderFromJson match {
      case JsSuccess(o: Order, path: JsPath) =>
        orderRepo.create(o.timeStamp, o.amount, o.userId, o.productId, o.address, o.dateSend, o.datePaid).map { _ => Ok }
      case e: JsError => Future.successful(Ok("Errors: " + JsError.toJson(e).toString()))
    }

  }

  def getOrders: Action[AnyContent] = Action.async { implicit request =>
    orderRepo.list().map { order =>
      Ok(toJson(order))
    }
  }

  def getOrderByUser(id: Int): Action[JsValue] = Action.async(parse.json) { implicit request =>

    var orderPerUser = new ArrayBuffer[Order]()

    orderRepo.list().map { order =>
      order.foreach(order => {
        if (order.userId == id) {
          orderPerUser += order
        }
      })
    }

    Future.successful(Ok(toJson(orderPerUser)))
  }
}