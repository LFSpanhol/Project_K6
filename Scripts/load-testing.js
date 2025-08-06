import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "load-testing.html": htmlReport(data),
  };
}

export let options = {
  vus: 500,
  stages: [
    { duration: '30s', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'avg<400'],
    http_req_failed: ['rate<0.01'],
    http_req_waiting: ['p(90)<400'],
    http_req_connecting: ['avg<100'],
    http_reqs: ['count>20000']
  }
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 900,
  });
  sleep(1); // simula usuário pensando
}