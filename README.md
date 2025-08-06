### K6
Projeto desenvolvido com K6, contemplando testes de fumaça e testes de carga.

### Teste de Fumaça (Smoke Testing)
Executado para validar se a API está funcional antes da realização dos testes de carga e desempenho.

### Teste de Carga (Load Testing)
Realizado para avaliar o desempenho da API sob um volume elevado de requisições simultâneas.

### Analise
- Tempo de espera (TTFB - Time To frist Byte):
  - Média: 2671.47 ms
  - Máximo: 60000.41 ms
  - Mediana: 2436.96 ms
  - 95th Percentile: 5489.76 ms
  - Analise:
    - Grande parte do tempo da requisição é aguardando ou esperando a resposta do servidor.
    - O tempo elevado do TTFB indica uma lentidão no processamento, que poder banco de dados lento, ou concorrência elevada na chamada.

- Sobre http_req_sending / http_req_receiving
  - Média Envio: 0.13ms
  - Méida Recebimento: 1436.23
  - Analise:
    - Temos um lentidão no recebimento da mensagem, o que pode ser, uma resposta muito grande ou restrições de I/O do servidor.

- Tempo total da iteração:
  - A média de interação ficou em 5 segundos, porém houve alguns picos (10% requisições) levaram cerca de 9 segundos.

- Há problemas significativos de desempenho no backend ou infraestrutura.
- Maior tempo de espera em "http_req_waiting" e "http_req_receiving", gerando indicios de lentidão na geração da resposta e entrega da resposta ao cliente.
  

Resultado do Teste:
- Apresentado no arquivo load-testing.html

### Gerar o relatório
Após a conclusão dos testes, o sistema gera automaticamente o relatório correspondente.
Para visualizá-lo, basta acessar o arquivo load-testing.html ou smoke-testing.html, onde são apresentados os resultados detalhados dos testes realizados.