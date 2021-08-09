export const Routes = {
  ONBOARDING_PAGE: "/",
  PLAY_GAME_PAGE: "/play/:roomId",
}

const baseUrl = "https://lovereact2.herokuapp.com/api";
export const API = {
  HEALTH_CHECK: `${baseUrl}/health-check`,
  USER_VERIFY: `${baseUrl}/user/verify`,
  USER_CREATE: `${baseUrl}/user/create`,
  USER_REMOVE: `${baseUrl}/user/remove`,
  GAME_CREATE: `${baseUrl}/game/create`,
  GAME_QUIT: `${baseUrl}/game/quit`,
}

export const baseWs = "https://lovereact2.herokuapp.com/ws";