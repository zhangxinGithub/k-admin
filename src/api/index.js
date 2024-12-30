import { ajax } from "@/api/ajax";

// const PublicPrefix = '/shortVideo'

export function clueSearchApi(params) {
  return ajax({
    url: `/clue/search`,
    method: "post",
    data: params
  });
}

export function employeeSearchApi(params) {
  return ajax({
    url: `/sys/employee/vague/search`,
    method: "post",
    data: params
  });
}

export function clueImpartApi(params) {
  return ajax({
    url: `/clue/impart`,
    method: "post",
    data: params
  });
}

export function employeeListApi(params) {
  return ajax({
    url: `/sys/employee/search`,
    method: "post",
    data: params
  });
}

export function employeeActionApi(type, params) {
  return ajax({
    url: `/sys/employee/${type}`,
    method: "post",
    data: params
  });
}


