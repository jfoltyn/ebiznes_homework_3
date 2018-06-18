package jobs

import akka.actor._
import com.mohiva.play.silhouette.api.util.Clock
import javax.inject.Inject
import jobs.AuthTokenCleaner.Clean
import models.services.AuthTokenService

import scala.concurrent.ExecutionContext.Implicits.global

/**
  * A job which cleanup invalid auth tokens.
  *
  * @param service The auth token service implementation.
  * @param clock   The clock implementation.
  */
class AuthTokenCleaner @Inject()(
                                  service: AuthTokenService,
                                  clock: Clock)
  extends Actor {

  /**
    * Process the received messages.
    */
  def receive: Receive = {
    case Clean =>
      service.clean.map { _ =>
      }.recover {
        case _ =>
      }
  }
}

/**
  * The companion object.
  */
object AuthTokenCleaner {

  case object Clean

}
