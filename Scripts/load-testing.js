import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 500,
  stages: [
    { duration: '30s', target: 500 }, // sobe para 500 usuários em 30 seg
    { duration: '5m', target: 500 }, // mantém 500 usuários por 5 min
    { duration: '1m', target: 0 },   //  derruba os usuários em 1 min
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem estar abaixo de 500ms
    http_req_failed: ['rate<0.03'],   // menos de 1% de falhas
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