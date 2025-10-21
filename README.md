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

<details open>
<summary><span style="font-size:4em"><strong>Sumário</strong></span></summary>
<br>

- [1 - Introdução](#1---introdução)
  - [1.1 - Motivação](#11---motivação)
  - [1.2 - Objetivos](#12---objetivos)
  - [1.3 - Cronograma do Projeto](#13---cronograma-do-projeto)
- [2 - Documento de Requisitos](#2---documento-de-requisitos)
  - [2.1 - Requisitos funcionais](#21---requisitos-funcionais)
  - [2.2 - Requisitos não funcionais](#22---requisitos-não-funcionais)
- [3 - Regras de Negócio](#3---regras-de-negócio)
  - [3.1 - O quê será elaborado](#31---o-quê-será-elaborado)
  - [3.2 - Como será elaborado](#32---como-será-elaborado)
  - [3.3 - Para quem será elaborado?](#33---para-quem-será-elaborado)
  - [3.4 - Quanto custará?](#34---quanto-custará)
- [4 - Estudo de viabilidade](#4---estudo-de-viabilidade)
  - [4.1 - Mercado](#41---mercado)
  - [4.2 - Financeiro](#42---financeiro)
  - [4.3 - Técnica](#43---técnica)
  - [4.4 - Operacional](#44---operacional)
- [5 - Modelo de dados](#5---modelo-de-dados)
  - [5.1 - Diagrama](#51---diagrama-logico-do-caso-de-uso-da-aplicação)
  - [5.2 - Atores](#52---atores)
  - [5.3 - Principais Casos de Uso](#53---principais-casos-de-uso)
- [6 - Design](#6---design)
  - [6.1 - Paleta de Cor](#61---paleta-de-cor)
  - [6.2 - Tipografia](#62---tipografia)
  - [6.3 - Logo](#63---logo)
  - [6.4 - Modelo de navegação](#64---modelo-de-navegação)
- [7 - Protótipo](#7---protótipo)
- [8 - Aplicação](#8---aplicação)
- [9 - Considerações Finais](#9---considerações-finais)

</details>

<br>

## 1 - Introdução

### 1.1 - Motivação

O mercado de trabalho brasileiro passa por uma significativa transformação, com crescimento notável tanto nas demissões voluntárias quanto no interesse por áreas de tecnologia. Esses movimentos revelam uma busca por novos modelos de trabalho que ofereçam maior autonomia e flexibilidade.

A Workly nasce da crescente insatisfação das pessoas com as condições tradicionais do mercado de trabalho, oferecendo uma alternativa mais justa, flexível e alinhada às demandas do futuro. A plataforma conecta talentos criativos e digitais a oportunidades reais, permitindo que cada profissional atue com autonomia, segurança e valorização do seu portfólio. Ao intermediar de forma transparente e justa a relação entre contratantes e freelancers, a Workly não apenas amplia as possibilidades de carreira, mas também transforma a frustração com o modelo convencional em oportunidades de crescimento, inovação e realização profissional.

<br>

### 1.2 - Objetivos

A Workly surge como resposta às transformações do mercado de trabalho contemporâneo, posicionando-se como uma plataforma integradora que conecta freelancers qualificados a oportunidades de projetos flexíveis. Nosso objetivo é desenvolver e consolidar uma plataforma digital inovadora que facilite conexões significativas entre profissionais independentes e contratantes da área de tecnologia, oferecendo segurança, eficiência e ferramentas adequadas para ambos os lados.

<br>

### 1.3 - Cronograma do Projeto

O Cronograma do projeto se encontra no link: [Trello do Projeto](https://trello.com/b/WpYWgrs3/pi-site-de-freelancer)

<br>

<p align="right"><a href="#inicio">[⬆ Voltar ao início]</a></p>

## 2 - Documento de Requisitos

Um Documento de Requisitos de Sistema (DRS) é um documento formal que descreve as funcionalidades e restrições de um sistema de software. Ele serve como um guia para a equipe de desenvolvimento, garantindo que o produto final atenda às expectativas dos usuários e às necessidades do negócio. O DRS detalha tanto os requisitos funcionais (o que o sistema deve fazer) quanto os não funcionais (como o sistema deve se comportar, como desempenho, segurança e usabilidade).

<br>

### 2.1 - Requisitos funcionais

Requisitos funcionais da aplicação (funcionalidades esperadas, necessidades que devem ser atendidas)

#### CADASTRO, ACESSO E PERFIL
- **RF 1** – O Sistema deve cadastrar usuário com informações básicas (Nome, E-mail e Senha).
- **RF 2** – Realizar login (Nome ou e-mail e senha).
- **RF 3** – Permitir a criação e edição de perfis de freelancers e contratantes.

#### BUSCA E NAVEGAÇÃO
- **RF 4** – Permitir a visualização de trabalhos públicos.
- **RF 5** – Navegar por categorias (Design, Programação, Animação, etc.).
- **RF 6** – Sistema de pesquisa por palavras-chave.

#### CRIAÇÃO E CONTRATAÇÃO DE PROJETOS
- **RF 7** – Possibilitar solicitação, criação e personalização de propostas.
- **RF 8** – Permitir a criação de projetos para receberem propostas.
- **RF 9** – Bloquear propostas indesejadas.
- **RF 10** – Permitir visualização dos status da proposta (Aceita, Entregue e Negada).

#### COMUNICAÇÃO E CONTRATOS

- **RF 11** – Permitir a comunicação direta entre freelancers e contratantes através de um sistema interno de mensagens de texto, imagens e documentos.
- **RF 12** – Sistema de Notificação por e-mail e whatsapp (Caso seja permitido pelo usuário).
- **RF 13** – Permitir que o projeto seja considerado entregue por meio de um check por ambas as partes.

#### PAGAMENTOS DEPOSITOS E SAQUES

- **RF 14** – Permitir visualização de saldo e a solicitação de saques.
- **RF 15** – Diferentes meios de saque e depósito (Cartão, PIX, etc).
- **RF 16** – Limites de saque em diferentes horários para garantir a segurança.
- **RF 17** – Possbilitar a visualização de histórico de transações.
- **RF 18** – Permitir pagamentos dos projetos seguindo o contrato.

#### AVALIAÇÕES E FEEDBACKS 

- **RF 19** – Permitir a avaliação e exibição pública de clientes e freelancers, com comentários e avaliação.

#### PÁGINAS IMPORTANTES
- **RF 20** – Página "Sobre Nós".
- **RF 21** – Página de "Como Funciona" (para freelancers e clientes).
- **RF 22** – Página de termos de serviço e políticas de privacidade.

<br>

### 2.2 - Requisitos não funcionais

Requisitos não funcionais da aplicação (qualidade)

- **RNF 1** - Desempenho
- **RNF 2** - Compatibilidade
- **RNF 3** - Usabilidade
- **RNF 4** - Escalabilidade
- **RNF 5** - Manutenibilidade
- **RNF 6** - Segurança

<p align="right"><a href="#inicio">[⬆ Voltar ao início]</a></p>

<br>

## 3 - Regras de Negócio

O Modelo de negócios da plataformase encontra abaixo:

[![Modelo de negocios](/WorklyMVC%20-%20v0.1/View/img/Modelo%20de%20Negócios%20Canvas%20WORKLY.png)](/WorklyMVC%20-%20v0.1/View/img/Modelo%20de%20Negócios%20Canvas%20WORKLY.png)

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

<p align="right"><a href="#inicio">[⬆ Voltar ao início]</a></p>

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

<p align="right"><a href="#inicio">[⬆ Voltar ao início]</a></p>

## 5 - Modelo de dados

### 5.1 - Diagrama logico do caso de uso da aplicação

[![Modelo de dados](/WorklyMVC%20-%20v0.1/View/img/Casos%20de%20uso%20Workly.jpg)](/WorklyMVC%20-%20v0.1/View/img/Casos%20de%20uso%20Workly.jpg)

### 5.2 - Atores

Ator    Descrição \
Cliente    Usuário que contrata serviços. Pode buscar freelancers, contratar e avaliar. \
Freelancer    Profissional que oferece serviços na plataforma. Pode cadastrar e editar serviços.\
Sistema (Plataforma)    Responsável por autenticação, armazenamento de dados e gerenciamento das ações.\
Administrador (opcional)    Pode gerenciar usuários, remover serviços inapropriados e resolver disputas.

### 5.3 - Principais Casos de Uso

01 – Cadastro de Usuário
 
Atores: Cliente, Freelancer\
Descrição: Permite que novos usuários criem uma conta informando dados pessoais e tipo de perfil.\
Fluxo principal:
 
O usuário acessa a tela de cadastro.
Informa nome, e-mail, senha e tipo de usuário (cliente ou freelancer).
O sistema valida as informações.
O sistema armazena os dados e confirma o cadastro.

Fluxo alternativo:\
2a. Se o e-mail já estiver cadastrado, o sistema exibe mensagem de erro.
Pós-condição: Conta criada com sucesso.
 
02 – Login
 
Atores: Cliente, Freelancer\
Descrição: Usuário acessa o sistema com suas credenciais.\
Fluxo principal:
 
Usuário informa e-mail e senha.
Sistema valida as credenciais.
Se válidas, o usuário é redirecionado ao seu painel.
Fluxo alternativo:\
2a. Se as credenciais forem inválidas, o sistema informa erro.
 
03 – Criação de Serviço
 
Atores: Freelancer\
Descrição: Freelancer cadastra um novo serviço.\
Fluxo principal:
 
Freelancer acessa o painel e escolhe “Criar novo serviço”.
Informa título, descrição, categoria, preço e prazo médio.
Sistema salva o serviço e o exibe na listagem.
Pós-condição: Serviço disponível para visualização por clientes.

04 – Busca e Visualização de Serviços
 
Atores: Cliente\
Descrição: Cliente pesquisa e visualiza serviços disponíveis.\
Fluxo principal:
 
Cliente acessa a página de busca.
Informa termos (ex: “edição de vídeo”).
Sistema lista serviços correspondentes.
Cliente clica em um serviço para ver detalhes e perfil do freelancer.
 
05 – Contratação de Serviço
 
Atores: Cliente, Freelancer\
Descrição: Cliente contrata um serviço de um freelancer.\
Fluxo principal:
 
Cliente seleciona o serviço desejado.
Sistema exibe detalhes e botão “Contratar”.
Cliente confirma e realiza pagamento (simulado ou via gateway).
Sistema notifica o freelancer da nova contratação.
Pós-condição: Contrato criado entre cliente e freelancer.

06 – Avaliação de Serviço
 
Atores: Cliente\
Descrição: Após a conclusão, cliente avalia o serviço.\
Fluxo principal:
 
Cliente acessa histórico de serviços concluídos.
Escolhe o serviço e adiciona nota e comentário.
Sistema registra a avaliação.
Pós-condição: Avaliação exibida no perfil do freelancer.
 
07 – Gerenciar Perfil
 
Atores: Freelancer, Cliente\
Descrição: Permite alterar dados do perfil.\
Fluxo principal:
 
Usuário acessa o painel de configurações.
Altera informações (nome, descrição, foto, etc).
Sistema salva as alterações.

<p align="right"><a href="#inicio">[⬆ Voltar ao início]</a></p>

<br>

## 6 - Design

### 6.1 - Paleta de Cor

A paleta de cores da Workly foi selecionada para transmitir profissionalismo, confiança e modernidade. As cores principais e as utilizadas em detalhes, tela de fundo e como cor da fonte foram escolhidas para garantir uma identidade visual coesa e agradável, facilitando a usabilidade e a experiência do usuário.

[![Palheta de cores](/WorklyMVC%20-%20v0.1/View/img/Palheta%20de%20cores.png)](/WorklyMVC%20-%20v0.1/View/img/Palheta%20de%20cores.png)

<br>

### 6.2 - Tipografia

As fontes escolhidas para o projeto Workly, Montserrat e Josefin Sans, foram selecionadas por sua excelente legibilidade, versatilidade e elegância. Elas contribuem para uma experiência de leitura agradável e reforçam a identidade visual profissional da plataforma.

<br>

### 6.3 - Logo

O logotipo da Workly é um isotipo que utiliza vetores e a fonte Montserrat, simbolizando a conexão eficiente e profissional entre freelancers e clientes. Seu design foi concebido para transmitir a essência da plataforma de forma clara.

<br>

### 6.4 - Modelo de navegação

[![Modelo de navegação](/WorklyMVC%20-%20v0.1/View/img/Modelo%20de%20navegação.png)](/WorklyMVC%20-%20v0.1/View/img/Modelo%20de%20navegação.png)

<p align="right"><a href="#inicio">[⬆ Voltar ao início]</a></p>

<br>

## 7 - Protótipo

O protótipo da Workly foi desenvolvido utilizando a ferramenta Figma, que permite a criação de interfaces interativas e visualmente atraentes. O protótipo inclui todas as principais telas e funcionalidades da plataforma, proporcionando uma visão clara de como os usuários irão interagir com o sistema.

Link para acessar o protótipo: [Figma do Projeto](https://www.figma.com/design/hYmRgDqf9kCFHGjJNyExRh/Prot%C3%B3tipo-P.I?node-id=0-1&t=5eQE3HyoxGAMwKo0-0)

<br>

## 8 - Aplicação

A aplicação foi desenvolvida inicialmente como uma página estática, incorporando exemplos de funcionalidades futuras e algumas já operacionais e armazenamos os arquivos e a documentação do projeto neste GitHub

[![Pagina inicial](/WorklyMVC%20-%20v0.1/View/img/paginainicial.png)](https://www.figma.com/design/hYmRgDqf9kCFHGjJNyExRh/Prot%C3%B3tipo-P.I?node-id=3-13&t=OfXh8xe9dPCxdqg8-4)

<br>

## 9 - Considerações Finais

### 1º Semestre
Este documento detalhou o processo de desenvolvimento da aplicação Workly. Durante o percurso, enfrentamos desafios, como a perda de um membro da equipe responsável pela documentação. No entanto, com a dedicação da equipe remanescente, conseguimos iniciar e avançar em diversas frentes, que serão concluídas no próximo semestre. Acreditamos que a Workly trará contribuições significativas para o mercado de trabalho, conectando freelancers e contratantes de forma eficiente e segura.

<p align="right"><a href="#inicio">[⬆ Voltar ao início]</a></p>
