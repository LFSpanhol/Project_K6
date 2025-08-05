import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem estar abaixo de 500ms
    http_req_failed: ['rate<0.01'],   // menos de 1% de falhas
  }
};

export default () => {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');
  check(res, {
    'status is 200': (r) => r.status === 200
  })
  sleep(1);
};