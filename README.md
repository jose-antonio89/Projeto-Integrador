<div align="center" id="inicio">

# ![Logo da Workly](WorklyMVC%20-%20v0.1/View/img/logo.png)
### Plataforma digital que conecta freelancers e contratantes de forma segura e eficiente.

***

### Centro Paula Souza
### Faculdade de Tecnologia de Jahu
### Curso de Tecnologia em Desenvolvimento de Software Multiplataforma

### Documento da aplicação web

### **Workly**

### Jaú, SP

### 1º Semestre/2025

***
</div>

<br>

<details>
<summary><span style="font-size:2em"><strong>Sumário</strong></span></summary>

- [1. Introdução](#1-introdução)
  - [1.1 - Motivação](#11-motivação)
  - [1.2 - Objetivos](#12-objetivos)
  - [1.3 - Cronograma do Projeto](#13-cronograma-do-projeto)
- [2. Documento de Requisitos](#2-documento-de-requisitos)
  - [2.1 - Requisitos funcionais](#21-requisitos-funcionais)
  - [2.2 - Requisitos não funcionais](#22-requisitos-não-funcionais)
- [3. Regras de Negócio](#3-regras-de-negócio)
  - [3.1 - O quê será elaborado](#31-o-quê-será-elaborado)
  - [3.2 - Como será elaborado](#32-como-será-elaborado)
  - [3.3 - Para quem será elaborado?](#33-para-quem-será-elaborado)
  - [3.4 - Quanto custará?](#34-quanto-custará)
- [4. Estudo de viabilidade](#4-estudo-de-viabilidade)
  - [4.1 - Mercado](#41-mercado)
  - [4.2 - Financeiro](#42-financeiro)
  - [4.3 - Técnica](#43-técnica)
  - [4.4 - Operacional](#44-operacional)
- [5. Design](#5-design)
  - [5.1 - Paleta de Cor](#51-paleta-de-cor)
  - [5.2 - Tipografia](#52-tipografia)
  - [5.3 - Logo](#53-logo)
  - [5.4 - Modelo de navegação](#54-modelo-de-navegação)
- [6. Protótipo](#6-protótipo)
- [7. Aplicação](#7-aplicação)
- [8. Considerações Finais](#8-considerações-finais)

</details>

<br>

## 1 - Introdução

### 1.1 - Motivação

O mercado de trabalho brasileiro passa por uma significativa transformação, com crescimento notável tanto nas demissões voluntárias quanto no interesse por áreas de tecnologia. Esses movimentos revelam uma busca por novos modelos de trabalho que ofereçam maior autonomia e flexibilidade.

Segundo o IBGE/FGV, as demissões voluntárias voltaram a bater recorde em julho de 2024, atingindo 2,243 milhões de demissões apenas no mês de junho de 2024. Este número representa um aumento consistente em relação aos meses anteriores, indicando uma mudança estrutural no mercado de trabalho:

[![GRAFICO 1](WorklyMVC%20-%20v0.1/View/img/figura1.jpg)](https://blogdoibre.fgv.br/posts/demissoes-pedido-permanecem-em-alta)

As demissões sem justa causa continuam em patamares significativos, com 888.201 demissões neste regime contra 323.068 demissões com justa causa. Os dados mostram que as demissões a pedido do empregado representam a maioria significativa dos casos:

[![GRAFICO 2](WorklyMVC%20-%20v0.1/View/img/figura2.jpg)](https://blogdoibre.fgv.br/posts/demissoes-pedido-permanecem-em-alta)

Paralelamente, pesquisa da Serasa Experian revela que 58,1% dos jovens entre 16-24 anos preferem atuar em desenvolvimento de sistemas, seguido por design (41,9%) e análise de dados (30,2%). Esta preferência por áreas que naturalmente permitem trabalho remoto e freelance cria um ambiente ideal para plataformas de conexão entre talentos e oportunidades:

[![GRAFICO 3](WorklyMVC%20-%20v0.1/View/img/figura3.png)](https://www.serasaexperian.com.br/sala-de-imprensa/rh/desenvolvimento-de-sistemas-e-escolha-de-6-em-cada-10-jovens-com-interesse-na-area-de-ti-revela-pesquisa-da-serasa-experian)

Este cenário duplo - aumento das demissões voluntárias e crescimento do interesse por tecnologia - cria um ambiente ideal para plataformas que conectam profissionais qualificados com oportunidades de trabalho flexível. Nossa plataforma se posiciona como a solução ideal para:

- **Profissionais** que buscam autonomia e projetos alinhados com suas habilidades técnicas
- **Empresas** que necessitam de talentos especializados em modalidade flexível
- **Jovens** da geração Z que preferem carreiras em tecnologia com liberdade geográfica

<br>

### 1.2 - Objetivos

A Workly surge como resposta às transformações do mercado de trabalho contemporâneo, posicionando-se como uma plataforma integradora que conecta freelancers qualificados a oportunidades de projetos flexíveis. Nosso objetivo é desenvolver e consolidar uma plataforma digital inovadora que facilite conexões significativas entre profissionais independentes e contratantes, oferecendo segurança, eficiência e ferramentas adequadas para ambos os lados.

<br>

### 1.3 - Cronograma do Projeto

O Cronograma do projeto se encontra no link: [Trello do Projeto](https://trello.com/b/WpYWgrs3/pi-site-de-freelancer)

<br>

## 2 - Documento de Requisitos

Um Documento de Requisitos de Sistema (DRS) é um documento formal que descreve as funcionalidades e restrições de um sistema de software. Ele serve como um guia para a equipe de desenvolvimento, garantindo que o produto final atenda às expectativas dos usuários e às necessidades do negócio. O DRS detalha tanto os requisitos funcionais (o que o sistema deve fazer) quanto os não funcionais (como o sistema deve se comportar, como desempenho, segurança e usabilidade).

<br>

### 2.1 - Requisitos funcionais

Requisitos funcionais da aplicação (funcionalidades esperadas, necessidades que devem ser atendidas)

#### CADASTRO, ACESSO E PERFIL
- **RF 1** – O Sistema deve cadastrar usuário com informações básicas (Nome, E-mail e Senha)
- **RF 2** – Realizar login (Nome ou e-mail e senha)
- **RF 3** – Permitir a criação e edição de perfis de freelancers e contratantes

#### BUSCA E NAVEGAÇÃO
- **RF 4** – Permitir a visualização de trabalhos públicos
- **RF 5** – Interfaces para freelancers e contratantes
- **RF 6** – Navegar por categorias (Design, Programação, Animação, etc.)
- **RF 7** – Sistema de pesquisa por palavras-chave

#### CRIAÇÃO E CONTRATAÇÃO DE PROJETOS
- **RF 8** – Permitir a criação de projetos para receberem propostas

#### PÁGINAS IMPORTANTES
- **RF 9** – Página "Sobre Nós"
- **RF 10** – Página de "Como Funciona" (para freelancers e clientes)

<br>

### 2.2 - Requisitos não funcionais

Requisitos não funcionais da aplicação (qualidade)

- **RNF 1** - Desempenho
- **RNF 2** - Compatibilidade
- **RNF 3** - Usabilidade
- **RNF 4** - Escalabilidade
- **RNF 5** - Manutenibilidade
- **RNF 6** - Segurança

<br>

## 3 - Regras de Negócio

O Modelo de negócios da plataforma se encontra abaixo:

[![Modelo de negocios](/WorklyMVC%20-%20v0.1/View/img/Modelo%@0de%20Negócios%20Canvas%20WORKLY.png)](View/img/Modelo-de-Negócios-Canvas-WORKLY.png)

<br>

### 3.1 - O quê será elaborado

A Workly é uma plataforma digital inovadora que conecta freelancers e contratantes de forma segura e eficiente. Desenvolvida para atender às demandas do mercado de trabalho atual, a plataforma oferece um ambiente completo com ferramentas de cadastro, busca avançada, comunicação integrada, processamento de pagamentos e sistema de avaliações, abrangendo diversas áreas profissionais como Tecnologia, Design e Animação.

<br>

### 3.2 - Como será elaborado

#### PARCERIAS PRINCIPAIS
Para garantir que tudo funcione perfeitamente, contamos com parceiros importantes. Trabalhamos com empresas especializadas em pagamentos digitais para proteger seu dinheiro, serviços de comunicação para facilitar o contato entre usuários e instituições de ensino que nos ajudam a encontrar os melhores talentos. Essas parcerias nos permitem oferecer uma experiência completa e confiável para todos que usam nossa plataforma.

#### ATIVIDADES PRINCIPAIS
Nosso trabalho se divide em quatro áreas essenciais. Primeiro, cuidamos constantemente do desenvolvimento e melhorias da plataforma. Segundo, investimos em divulgação para atrair bons profissionais e clientes. Terceiro, oferecemos suporte rápido e eficiente para resolver qualquer dúvida. Por último, criamos oportunidades para a comunidade se conectar e crescer juntas através de eventos e iniciativas especiais.

#### RECURSOS PRINCIPAIS
Temos tudo o que precisamos para fazer a Workly dar certo: uma equipe dedicada, tecnologia de qualidade, sistemas seguros de pagamento e um banco de dados com perfis verificados. Esses recursos nos permitem manter a plataforma estável, segura e sempre evoluindo para atender melhor nossos usuários.

<br>

### 3.3 - Para quem será elaborado?

#### SEGMENTO DE MERCADO
Nosso foco são os profissionais freelancers, especialmente os jovens que trabalham com tecnologia e design, e as pequenas empresas que precisam contratar serviços especializados sem complicações. Sabemos que muitos jovens querem trabalhar com TI e que muitas empresas buscam agilidade - a Workly existe para conectar esses dois lados.

#### RELACIONAMENTO COM CLIENTES
Mantemos um relacionamento próximo com todos que usam nossa plataforma. Você pode contar com nosso suporte quando precisar, temos materiais para ajudar no autoatendimento, promovemos eventos para a comunidade se conhecer melhor e valorizamos muito o feedback de todos para continuarmos melhorando.

#### CANAIS
Estamos presentes onde nossos usuários estão: na nossa plataforma principal (site), nas redes sociais mais usadas pelo público e através das nossas parcerias com faculdades e empresas. Assim fica fácil encontrar e usar a Workly do jeito que preferir.

<br>

### 3.4 - Quanto custará?

O aplicativo terá como início com um conjunto de funcionalidades menor e na medida em que o número de usuarios e sua complexidade for aumentando maior será o valor de investimento a cada etapa, a princípio vamos considerar apenas um valor mínimo necessário para um primeiro lançamento da plataforma. Todos os custos abaixo se referem a valores na presente data deste documento.

#### CUSTO DE DESENVOLVIMENTO
Por se tratar de uma plataforma criada para um fim acadêmico, não teremos nenhum custo com desenvolvimento, já que a própria equipe será encarregada dessa função de desenvolver os itens necessários para o bom funcionamento da Workly.

#### CUSTO DE INFRAESTRUTURA

**Hospedagem**
Inicialmente serão utilizadas versões gratuitas de serviço em nuvem ou outros tipos de servidores para armazenamento do banco de dados dos usuários, mas posteriormente com a fonte de receitas dando renda serão aprimorados de acordo com a necessidade.

**Domínio e Certificado SSL**
Os domínios e a obtenção de um certificados SSL para o site atualmente são cotados por ano, e variam entre R$10,00 e R$100,00 reais ao ano, como ainda estamos em uma etapa de estimativas, vamos estimar o custo para a pior condição, portanto consideramos R$100,00 para uma implantação inicial por um período de um ano.

#### CUSTO DE DESPESAS LEGAIS E ADMINISTRATIVAS
A princípio a plataforma não será registrada como uma empresa e sim apenas como um objeto de estudo acadêmico, portanto, não consideramos despesas legais e nem administrativas.

#### CUSTO DE MARKETING
Todo o lançamento e marketing serão realizados de maneira orgânica inicialmente, podendo escalar para tráfegos pagos dependendo do retorno das receitas e velocidade de escala da plataforma.

<br>

## 4 - Estudo de viabilidade

### 4.1 - Mercado

O mercado de plataformas para freelancers no Brasil está em constante expansão, impulsionado pela crescente demanda por trabalho remoto e pela valorização de profissionais autônomos, especialmente nas áreas de tecnologia e design. Embora existam diversos sites semelhantes, a Workly se diferencia por oferecer uma experiência mais ampla e personalizada, com foco em cursos, capacitação e oportunidades voltadas para o público jovem e para empresas que buscam inovação.

<br>

### 4.2 - Financeiro

Será cobrado 10% do total que será pago na assinatura do freelancer ao ser contratado pelo preço a ser cobrado. Os anúncios e um plano premium serão também uma forma de aquisição monetária. Os gastos seriam hospedagem e anúncios de divulgação.

<br>

### 4.3 - Técnica

Os requisitos serão cumpridos em apenas um computador para cada integrante do grupo, com a utilização de ferramentas gratuitas para o desenvolvimento do projeto, como o Visual Studio Code, Figma, Trello e GitHub. A hospedagem inicial será feita em plataformas gratuitas, como o GitHub Pages, que oferece serviços básicos sem custo. À medida que a plataforma cresce, podemos considerar opções pagas como AWS ou DigitalOcean para garantir maior estabilidade e recursos adicionais.

<br>

### 4.4 - Operacional

A organização é perfeitamente capaz de executar o projeto e concluí-lo. Onde seria necessário 4 pessoas para seu feitio. Cada integrante do grupo teria uma função diferente, como front-end, back-end, designer e gerente de projeto. A comunicação seria feita por meio de reuniões semanais e o uso de ferramentas como Trello para gerenciamento de tarefas e GitHub para controle de versão do código. A colaboração eficaz entre os membros da equipe garantirá que o projeto seja concluído dentro do prazo e com alta qualidade.

<br>

## 5 - Design

### 5.1 - Paleta de Cor

A paleta de cores da Workly foi selecionada para transmitir profissionalismo, confiança e modernidade. As cores principais e as utilizadas em detalhes, tela de fundo e como cor da fonte foram escolhidas para garantir uma identidade visual coesa e agradável, facilitando a usabilidade e a experiência do usuário.

[![Palheta de cores](/WorklyMVC%20-%20v0.1/View/img/Palheta%20de%20cores.png)](/WorklyMVC%20-%20v0.1/View/img/Palheta%20de%20cores.png)

<br>

### 5.2 - Tipografia

As fontes escolhidas para o projeto Workly, Montserrat e Josefin Sans, foram selecionadas por sua excelente legibilidade, versatilidade e elegância. Elas contribuem para uma experiência de leitura agradável e reforçam a identidade visual profissional da plataforma.

<br>

### 5.3 - Logo

O logotipo da Workly é um isotipo que utiliza vetores e a fonte Montserrat, simbolizando a conexão eficiente e profissional entre freelancers e clientes. Seu design foi concebido para transmitir a essência da plataforma de forma clara.

<br>

### 5.4 - Modelo de navegação

[![Modelo de navegação](/View/img/Modelo%20de%20Negócios%20Canvas%20WORKLY.png)](/WorklyMVC%20-%20v0.1/View/img/Palheta%20de%20cores.png)

<br>

## 6 - Protótipo

O protótipo da Workly foi desenvolvido utilizando a ferramenta Figma, que permite a criação de interfaces interativas e visualmente atraentes. O protótipo inclui todas as principais telas e funcionalidades da plataforma, proporcionando uma visão clara de como os usuários irão interagir com o sistema.

Link para acessar o protótipo: [Figma do Projeto](https://www.figma.com/design/hYmRgDqf9kCFHGjJNyExRh/Prot%C3%B3tipo-P.I?node-id=0-1&t=5eQE3HyoxGAMwKo0-0)

<br>

## 7 - Aplicação

A aplicação foi desenvolvida inicialmente como uma página estática, incorporando exemplos de funcionalidades futuras e algumas já operacionais.

Link para o GitHub: [Github do Projeto](https://github.com/jose-antonio89/Projeto-Integrador)

<br>

## 8 - Considerações Finais

### 1º Semestre
Este documento detalhou o processo de desenvolvimento da aplicação Workly. Durante o percurso, enfrentamos desafios, como a perda de um membro da equipe responsável pela documentação. No entanto, com a dedicação da equipe remanescente, conseguimos iniciar e avançar em diversas frentes, que serão concluídas no próximo semestre. Acreditamos que a Workly trará contribuições significativas para o mercado de trabalho, conectando freelancers e contratantes de forma eficiente e segura.
