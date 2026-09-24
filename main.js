document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // 1. DADOS INICIAIS FICTÍCIOS DE CLIENTES E APÓLICES
    // ========================================================
    const INITIAL_POLICIES = [
        {
            id: 'pol-1',
            apolice: 'AP-2024-8841',
            cliente: 'Cláudio Silveira',
            cpf: '123.456.789-00',
            email: 'claudio.silveira@email.com',
            telefone: '(11) 98765-4321',
            title: 'Apólice Auto - Cláudio Silveira',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'Porto Seguro',
            valor: 'R$ 4.850,00',
            franquia: 'R$ 1.200,00',
            vigenciaInicio: '15/01/2026',
            vigenciaFim: '15/01/2027',
            status: 'doing',
            tag: 'Auto',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'CS',
            date: '15 Jan 2026',
            desc: 'Toyota Corolla Cross 2024. Cobertura compreensiva 100% FIPE com carro reserva ilimitado e vidros completos.',
            endereco: 'Av. Paulista, 1500, Apto 82 - Bela Vista, São Paulo - SP',
            coberturas: 'Colisão, Incêndio, Roubo/Furto, Danos a Terceiros (R$ 500k)',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Cliente VIP desde 2021. Solicitação de desconto de renovação aprovada.'
        },
        {
            id: 'pol-2',
            apolice: 'AP-2024-5120',
            cliente: 'Mariana Mendes',
            cpf: '234.567.890-11',
            email: 'mariana.mendes@email.com',
            telefone: '(21) 99876-5432',
            title: 'Apólice Residencial - Mariana Mendes',
            tipoSeguro: 'Seguro Residencial',
            seguradora: 'Allianz Seguros',
            valor: 'R$ 1.420,00',
            franquia: 'R$ 500,00',
            vigenciaInicio: '01/02/2026',
            vigenciaFim: '01/02/2027',
            status: 'done',
            tag: 'Residencial',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'MM',
            date: '01 Fev 2026',
            desc: 'Imóvel residencial em condomínio fechado. Cobertura contra incêndio, vendaval e danos elétricos.',
            endereco: 'Rua das Laranjeiras, 450 - Rio de Janeiro - RJ',
            coberturas: 'Incêndio (R$ 800k), Danos Elétricos (R$ 50k), Responsabilidade Civil Familiar',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Vistoria prévia aprovada sem ressalvas.'
        },
        {
            id: 'pol-3',
            apolice: 'AP-2024-9932',
            cliente: 'Roberto Alves',
            cpf: '345.678.901-22',
            email: 'roberto.alves@email.com',
            telefone: '(31) 97654-3210',
            title: 'Apólice Vida Individual - Roberto Alves',
            tipoSeguro: 'Seguro de Vida',
            seguradora: 'Bradesco Seguros',
            valor: 'R$ 2.150,00',
            franquia: 'Isento',
            vigenciaInicio: '10/03/2026',
            vigenciaFim: '10/03/2027',
            status: 'doing',
            tag: 'Vida',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'RA',
            date: '10 Mar 2026',
            desc: 'Capital segurado de R$ 1.000.000,00 com cobertura adicional para doenças graves e internação.',
            endereco: 'Rua Gonçalves Dias, 820 - Belo Horizonte - MG',
            coberturas: 'Morte Qualquer Causa, Invalidez Permanente Total/Parcial, Doenças Graves',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Exames laboratoriais validados pela seguradora.'
        },
        {
            id: 'pol-4',
            apolice: 'AP-2024-1147',
            cliente: 'Ana Beatriz Ramos',
            cpf: '456.789.012-33',
            email: 'ana.ramos@email.com',
            telefone: '(41) 98822-1133',
            title: 'Apólice Empresarial - Ana Beatriz',
            tipoSeguro: 'Seguro Empresarial',
            seguradora: 'SulAmérica',
            valor: 'R$ 6.900,00',
            franquia: 'R$ 2.500,00',
            vigenciaInicio: '20/04/2026',
            vigenciaFim: '20/04/2027',
            status: 'todo',
            tag: 'Empresarial',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'AB',
            date: '20 Abr 2026',
            desc: 'Galpão comercial e escritório de tecnologia. Cobertura para equipamentos eletrônicos e lucros cessantes.',
            endereco: 'Av. Cândido de Abreu, 300 - Curitiba - PR',
            coberturas: 'Incêndio/Explosão (R$ 2M), Equipamentos Eletrônicos (R$ 300k), Lucros Cessantes',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Aguardando validação do laudo do corpo de bombeiros.'
        },
        {
            id: 'pol-5',
            apolice: 'AP-2024-6621',
            cliente: 'Carlos Eduardo Souza',
            cpf: '567.890.123-44',
            email: 'carlos.souza@email.com',
            telefone: '(19) 97123-4567',
            title: 'Apólice Saúde PME - Carlos Eduardo',
            tipoSeguro: 'Plano de Saúde PME',
            seguradora: 'Amil Saúde',
            valor: 'R$ 3.800,00',
            franquia: 'Coparticipação 20%',
            vigenciaInicio: '01/05/2026',
            vigenciaFim: '01/05/2027',
            status: 'todo',
            tag: 'Saúde',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'CE',
            date: '01 Mai 2026',
            desc: 'Plano corporativo para 6 vidas. Quarto privativo com abrangência nacional e reembolso.',
            endereco: 'Rua Barão de Jaguara, 1100 - Campinas - SP',
            coberturas: 'Consultas, Exames, Internações Clínicas/Cirúrgicas, Obstetrícia',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Proposta em análise de redução de carências.'
        },
        {
            id: 'pol-6',
            apolice: 'AP-2024-3310',
            cliente: 'Juliana Paes Silva',
            cpf: '678.901.234-55',
            email: 'juliana.silva@email.com',
            telefone: '(11) 98112-9988',
            title: 'Plano de Saúde Família - Juliana Paes',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'Unimed',
            valor: 'R$ 2.640,00',
            franquia: 'Sem Coparticipação',
            vigenciaInicio: '10/01/2026',
            vigenciaFim: '10/01/2027',
            status: 'doing',
            tag: 'Saúde',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'JP',
            date: '10 Jan 2026',
            desc: 'Unimed Nacional Estilo. Acomodação em apartamento privativo para titular e 2 dependentes.',
            endereco: 'Alameda Santos, 2200, Apto 112 - Cerqueira César, São Paulo - SP',
            coberturas: 'Hospitalar + Obstetrícia, Telemedicina 24h, Livre escolha com reembolso',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Inclusão de dependente recém-nascido deferida com sucesso.'
        },
        {
            id: 'pol-7',
            apolice: 'AP-2024-4402',
            cliente: 'Fernando Castilho',
            cpf: '789.012.345-66',
            email: 'fernando.castilho@email.com',
            telefone: '(11) 97345-6789',
            title: 'Apólice Auto Híbrido - Fernando Castilho',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'Bradesco Seguros',
            valor: 'R$ 5.320,00',
            franquia: 'R$ 1.800,00',
            vigenciaInicio: '18/02/2026',
            vigenciaFim: '18/02/2027',
            status: 'done',
            tag: 'Auto',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'FC',
            date: '18 Fev 2026',
            desc: 'Honda Civic Híbrido e:HEV 2024. Cobertura completa para bateria e componentes elétricos.',
            endereco: 'Rua Pedroso Alvarenga, 780 - Itaim Bibi, São Paulo - SP',
            coberturas: 'Compreensiva 100% FIPE, Carro Reserva Executivo (30 dias), Vidros Blindados',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Renovação sem sinistro com bônus classe 10.'
        },
        {
            id: 'pol-8',
            apolice: 'AP-2024-7789',
            cliente: 'Patrícia Fagundes',
            cpf: '890.123.456-77',
            email: 'patricia.fagundes@email.com',
            telefone: '(11) 96456-7890',
            title: 'Plano Smart 500 - Patrícia Fagundes',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'Notredame Intermédica',
            valor: 'R$ 1.890,00',
            franquia: 'Coparticipação 15%',
            vigenciaInicio: '05/03/2026',
            vigenciaFim: '05/03/2027',
            status: 'doing',
            tag: 'Saúde',
            priority: 'Baixa',
            priorityColor: '#10b981',
            assignee: 'PF',
            date: '05 Mar 2026',
            desc: 'Linha Smart 500 com ampla rede própria NotreLife e hospitais credenciados na Grande SP.',
            endereco: 'Rua Vergueiro, 3100 - Vila Mariana, São Paulo - SP',
            coberturas: 'Ambulatorial e Hospitalar com Obstetrícia, Centro de Oncologia',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Migração de plano individual para corporativo em andamento.'
        },
        {
            id: 'pol-9',
            apolice: 'AP-2024-2254',
            cliente: 'Lucas Albuquerque',
            cpf: '901.234.567-88',
            email: 'lucas.albuquerque@email.com',
            telefone: '(81) 98765-1234',
            title: 'Apólice SUV - Lucas Albuquerque',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'Azul Seguros',
            valor: 'R$ 3.980,00',
            franquia: 'R$ 1.100,00',
            vigenciaInicio: '12/04/2026',
            vigenciaFim: '12/04/2027',
            status: 'todo',
            tag: 'Auto',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'LA',
            date: '12 Abr 2026',
            desc: 'Jeep Compass Longitude 2023. Uso misto comercial e particular.',
            endereco: 'Av. Boa Viagem, 2400 - Boa Viagem, Recife - PE',
            coberturas: 'Compreensiva FIPE 100%, Danos Materiais R$ 200k, Guincho ilimitado',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Pendente envio de comprovante de residência atualizado.'
        },
        {
            id: 'pol-10',
            apolice: 'AP-2024-8119',
            cliente: 'Rodrigo Santoro Mendes',
            cpf: '012.345.678-99',
            email: 'rodrigo.santoro@email.com',
            telefone: '(11) 99123-4567',
            title: 'Apólice Residencial Jardins - Rodrigo',
            tipoSeguro: 'Seguro Residencial',
            seguradora: 'Tokio Marine',
            valor: 'R$ 1.650,00',
            franquia: 'R$ 600,00',
            vigenciaInicio: '01/01/2026',
            vigenciaFim: '01/01/2027',
            status: 'doing',
            tag: 'Residencial',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'RS',
            date: '01 Jan 2026',
            desc: 'Apartamento de alto padrão nos Jardins. Cobertura para obras de arte e joias.',
            endereco: 'Rua Haddock Lobo, 1307 - Cerqueira César, São Paulo - SP',
            coberturas: 'Incêndio (R$ 1.5M), Roubo de Bens (R$ 150k), Danos Elétricos e Hidráulicos',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Apólice contratada com cláusula especial de joias e obras de arte.'
        },
        {
            id: 'pol-11',
            apolice: 'AP-2024-9043',
            cliente: 'Camila Queiroz Lima',
            cpf: '112.233.445-56',
            email: 'camila.queiroz@email.com',
            telefone: '(21) 98234-5678',
            title: 'Top Nacional Plus - Camila Queiroz',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'Bradesco Saúde',
            valor: 'R$ 4.120,00',
            franquia: 'Sem Coparticipação',
            vigenciaInicio: '15/02/2026',
            vigenciaFim: '15/02/2027',
            status: 'done',
            tag: 'Saúde',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'CQ',
            date: '15 Fev 2026',
            desc: 'Plano Top Nacional com reembolso ampliado para consultas de especialistas e hospitais Albert Einstein e Sírio-Libanês.',
            endereco: 'Av. Vieira Souto, 500 - Ipanema, Rio de Janeiro - RJ',
            coberturas: 'Internação em Quarto Privativo, Concierge hospitalar, Reembolso 100% tabela',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Renovação anual com acréscimo de seguro viagem internacional.'
        },
        {
            id: 'pol-12',
            apolice: 'AP-2024-3450',
            cliente: 'Gabriel Nogueira',
            cpf: '223.344.556-67',
            email: 'gabriel.nogueira@email.com',
            telefone: '(31) 98456-7890',
            title: 'Unimed Odonto Executivo - Gabriel Nogueira',
            tipoSeguro: 'Plano Odontológico',
            seguradora: 'Unimed',
            valor: 'R$ 480,00',
            franquia: 'Isento',
            vigenciaInicio: '01/03/2026',
            vigenciaFim: '01/03/2027',
            status: 'doing',
            tag: 'Odonto',
            priority: 'Baixa',
            priorityColor: '#10b981',
            assignee: 'GN',
            date: '01 Mar 2026',
            desc: 'Plano odontológico com cobertura para ortodontia, clareamento e próteses.',
            endereco: 'Av. Afonso Pena, 3200 - Funcionários, Belo Horizonte - MG',
            coberturas: 'Urgências 24h, Próteses, Ortodontia completa, Documentação radiológica',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Contrato corporativo estendido para familiares de primeiro grau.'
        },
        {
            id: 'pol-13',
            apolice: 'AP-2024-7128',
            cliente: 'Bianca Toledo',
            cpf: '334.455.667-78',
            email: 'bianca.toledo@email.com',
            telefone: '(41) 99112-3344',
            title: 'SulAmérica Especial 100 - Bianca Toledo',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'SulAmérica',
            valor: 'R$ 3.490,00',
            franquia: 'Coparticipação Parcial',
            vigenciaInicio: '25/04/2026',
            vigenciaFim: '25/04/2027',
            status: 'todo',
            tag: 'Saúde',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'BT',
            date: '25 Abr 2026',
            desc: 'Plano Especial 100 com direito a hospitais de referência em Curitiba e rede D’Or.',
            endereco: 'Rua Comendador Araújo, 400 - Batel, Curitiba - PR',
            coberturas: 'Exames de Alta Complexidade, Fisioterapia ilimitada, Parto humanizado',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Proposta aguardando análise de Declaração de Saúde.'
        },
        {
            id: 'pol-14',
            apolice: 'AP-2024-5581',
            cliente: 'Marcelo D\'Ávila',
            cpf: '445.566.778-89',
            email: 'marcelo.davila@email.com',
            telefone: '(11) 97788-9900',
            title: 'Apólice Auto Premium - Marcelo D\'Ávila',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'Mapfre Seguros',
            valor: 'R$ 8.750,00',
            franquia: 'R$ 3.500,00',
            vigenciaInicio: '10/02/2026',
            vigenciaFim: '10/02/2027',
            status: 'doing',
            tag: 'Auto',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'MD',
            date: '10 Fev 2026',
            desc: 'BMW 320i M Sport 2024. Cobertura especial para rodas, pneus e retrovisores fotocrômicos.',
            endereco: 'Rua Funchal, 200 - Vila Olímpia, São Paulo - SP',
            coberturas: 'FIPE 100% + Danos Corporais R$ 1.000.000 + Proteção completa de vidros',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Rastreador via satélite homologado instalado e certificado.'
        },
        {
            id: 'pol-15',
            apolice: 'AP-2024-1902',
            cliente: 'Vanessa Guimarães',
            cpf: '556.677.889-90',
            email: 'vanessa.guimaraes@email.com',
            telefone: '(12) 98877-6655',
            title: 'Apólice Casa de Praia - Vanessa',
            tipoSeguro: 'Seguro Residencial',
            seguradora: 'Porto Seguro',
            valor: 'R$ 2.300,00',
            franquia: 'R$ 800,00',
            vigenciaInicio: '15/01/2026',
            vigenciaFim: '15/01/2027',
            status: 'done',
            tag: 'Residencial',
            priority: 'Baixa',
            priorityColor: '#10b981',
            assignee: 'VG',
            date: '15 Jan 2026',
            desc: 'Casa de veraneio em Ubatuba. Cobertura específica para maresia, vendaval e alagamento.',
            endereco: 'Rua das Gaivotas, 120 - Praia Grande, Ubatuba - SP',
            coberturas: 'Incêndio (R$ 1M), Vendaval/Granizo (R$ 100k), Desmoronamento, Roubo',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Instalação de câmeras e alarme monitorado 24h pela Porto Seguro.'
        },
        {
            id: 'pol-16',
            apolice: 'AP-2024-6334',
            cliente: 'Thiago Sampaio',
            cpf: '667.788.990-01',
            email: 'thiago.sampaio@email.com',
            telefone: '(51) 99345-6789',
            title: 'Apólice Clínica Odonto - Thiago Sampaio',
            tipoSeguro: 'Seguro Empresarial',
            seguradora: 'Sompo Seguros',
            valor: 'R$ 5.100,00',
            franquia: 'R$ 2.000,00',
            vigenciaInicio: '01/04/2026',
            vigenciaFim: '01/04/2027',
            status: 'doing',
            tag: 'Empresarial',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'TS',
            date: '01 Abr 2026',
            desc: 'Consultório e clínica odontológica. Proteção para cadeiras odontológicas, autoclaves e tomógrafo.',
            endereco: 'Av. Carlos Gomes, 1400 - Bela Vista, Porto Alegre - RS',
            coberturas: 'Equipamentos Médicos/Odontológicos (R$ 400k), Responsabilidade Civil Profissional',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Seguro renovado pelo terceiro ano consecutivo com franquia reduzida.'
        },
        {
            id: 'pol-17',
            apolice: 'AP-2024-4198',
            cliente: 'Renata Vasconcellos',
            cpf: '778.899.001-12',
            email: 'renata.vasconcellos@email.com',
            telefone: '(21) 99456-7890',
            title: 'Amil One S2500 Black - Renata Vasconcellos',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'Amil Saúde',
            valor: 'R$ 7.800,00',
            franquia: 'Sem Coparticipação',
            vigenciaInicio: '20/01/2026',
            vigenciaFim: '20/01/2027',
            status: 'done',
            tag: 'Saúde',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'RV',
            date: '20 Jan 2026',
            desc: 'Linha Premium Amil One. Cobertura internacional, resgate aéreo aeromédico e check-up executivo anual no Einstein.',
            endereco: 'Rua Rainha Elizabeth, 340 - Copacabana, Rio de Janeiro - RJ',
            coberturas: 'Internação em Suíte, Cobertura Internacional US$ 300k, Reembolso VIP em até 24h',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Contrato categoria Black com motorista para exames e coleta domiciliar.'
        },
        {
            id: 'pol-18',
            apolice: 'AP-2024-8271',
            cliente: 'Diego Hipólito',
            cpf: '889.900.112-23',
            email: 'diego.hipolito@email.com',
            telefone: '(11) 98567-8901',
            title: 'Vida Atleta & Acidentes - Diego Hipólito',
            tipoSeguro: 'Seguro de Vida',
            seguradora: 'Zurich Seguros',
            valor: 'R$ 1.780,00',
            franquia: 'Isento',
            vigenciaInicio: '15/03/2026',
            vigenciaFim: '15/03/2027',
            status: 'todo',
            tag: 'Vida',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'DH',
            date: '15 Mar 2026',
            desc: 'Seguro de vida e acidentes com cláusula para atletas e profissionais de atividade física.',
            endereco: 'Rua Harmonia, 520 - Vila Madalena, São Paulo - SP',
            coberturas: 'Morte Acidental R$ 800k, Diárias de Incapacidade Temporária (DIT), Cirurgias',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Proposta com questionário médico complementar em análise.'
        },
        {
            id: 'pol-19',
            apolice: 'AP-2024-2890',
            cliente: 'Larissa Manoela Costa',
            cpf: '990.011.223-34',
            email: 'larissa.costa@email.com',
            telefone: '(11) 97678-9012',
            title: 'Apólice SUV Taos - Larissa Manoela',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'Liberty Seguros',
            valor: 'R$ 4.200,00',
            franquia: 'R$ 1.350,00',
            vigenciaInicio: '01/02/2026',
            vigenciaFim: '01/02/2027',
            status: 'doing',
            tag: 'Auto',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'LC',
            date: '01 Fev 2026',
            desc: 'Volkswagen Taos Highline 2024. Cobertura para kit multimídia, retrovisores e vidros.',
            endereco: 'Av. Ibirapuera, 2030 - Moema, São Paulo - SP',
            coberturas: 'FIPE 100%, Danos Morais R$ 100k, Carro Reserva Sedan Médio 15 dias',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Apólice emitida com assistência 24h sem limite de quilometragem.'
        },
        {
            id: 'pol-20',
            apolice: 'AP-2024-9556',
            cliente: 'Felipe Bronze Alcantara',
            cpf: '001.122.334-45',
            email: 'felipe.bronze@email.com',
            telefone: '(21) 99789-0123',
            title: 'Apólice Restaurante - Felipe Bronze',
            tipoSeguro: 'Seguro Empresarial',
            seguradora: 'Bradesco Seguros',
            valor: 'R$ 7.400,00',
            franquia: 'R$ 2.800,00',
            vigenciaInicio: '10/01/2026',
            vigenciaFim: '10/01/2027',
            status: 'done',
            tag: 'Empresarial',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'FA',
            date: '10 Jan 2026',
            desc: 'Restaurante contemporâneo com cozinha industrial, fornos combinados e câmara fria.',
            endereco: 'Rua Dias Ferreira, 600 - Leblon, Rio de Janeiro - RJ',
            coberturas: 'Incêndio R$ 3M, Perda de Alimentos Refrigerados R$ 80k, Responsabilidade Civil Bar/Restaurante',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Vistoria anual de exaustores e extintores regularizada.'
        },
        {
            id: 'pol-21',
            apolice: 'AP-2024-3112',
            cliente: 'Amanda Peçanha',
            cpf: '123.321.456-99',
            email: 'amanda.pecanha@email.com',
            telefone: '(71) 98899-0011',
            title: 'Unimed Flex Regional - Amanda Peçanha',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'Unimed',
            valor: 'R$ 1.950,00',
            franquia: 'Coparticipação 20%',
            vigenciaInicio: '01/05/2026',
            vigenciaFim: '01/05/2027',
            status: 'todo',
            tag: 'Saúde',
            priority: 'Baixa',
            priorityColor: '#10b981',
            assignee: 'AP',
            date: '01 Mai 2026',
            desc: 'Plano regional com cobertura em Salvador e região metropolitana, enfermaria coletiva.',
            endereco: 'Av. Tancredo Neves, 1200 - Caminho das Árvores, Salvador - BA',
            coberturas: 'Consultas eletivas e exames laboratoriais, Pronto-atendimento Unimed',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Aguardando validação da portabilidade de carências.'
        },
        {
            id: 'pol-22',
            apolice: 'AP-2024-6744',
            cliente: 'Bruno Gagliasso Rezende',
            cpf: '234.432.567-00',
            email: 'bruno.rezende@email.com',
            telefone: '(21) 98788-1122',
            title: 'Apólice Volvo Híbrido - Bruno Rezende',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'HDI Seguros',
            valor: 'R$ 9.100,00',
            franquia: 'R$ 3.800,00',
            vigenciaInicio: '15/02/2026',
            vigenciaFim: '15/02/2027',
            status: 'doing',
            tag: 'Auto',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'BR',
            date: '15 Fev 2026',
            desc: 'Volvo XC60 Recharge Plug-in 2024. Cobertura para carregador wallbox e cabos de recarga.',
            endereco: 'Estrada do Joá, 1500 - Joá, Rio de Janeiro - RJ',
            coberturas: 'FIPE 100% Valor de Novo, Carregador Portátil e Fixo, Danos Materiais R$ 500k',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Contrato inclui serviço de reboque com plataforma rebaixada especial.'
        },
        {
            id: 'pol-23',
            apolice: 'AP-2024-5089',
            cliente: 'Luciana Gimenez Morad',
            cpf: '345.543.678-11',
            email: 'luciana.morad@email.com',
            telefone: '(11) 99899-2233',
            title: 'Omint C32 Hospitalar - Luciana Morad',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'Omint Saúde',
            valor: 'R$ 12.500,00',
            franquia: 'Sem Coparticipação',
            vigenciaInicio: '01/01/2026',
            vigenciaFim: '01/01/2027',
            status: 'doing',
            tag: 'Saúde',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'LM',
            date: '01 Jan 2026',
            desc: 'Plano Omint C32 com padrão internacional de hotelaria hospitalar, vacinas e reembolso de alta tabela.',
            endereco: 'Rua Groenlândia, 900 - Jardim América, São Paulo - SP',
            coberturas: 'Cirurgias Robóticas, Parto sem carência, Reembolso odontológico e médico em até 48h',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Cliente VIP corporativo com concierge médico individual.'
        },
        {
            id: 'pol-24',
            apolice: 'AP-2024-1423',
            cliente: 'Gustavo Kuerten Becker',
            cpf: '456.654.789-22',
            email: 'gustavo.becker@email.com',
            telefone: '(48) 99122-3344',
            title: 'Care Plus Master I Max - Gustavo Becker',
            tipoSeguro: 'Plano de Saúde',
            seguradora: 'Care Plus',
            valor: 'R$ 8.900,00',
            franquia: 'Sem Coparticipação',
            vigenciaInicio: '20/03/2026',
            vigenciaFim: '20/03/2027',
            status: 'done',
            tag: 'Saúde',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'GB',
            date: '20 Mar 2026',
            desc: 'Plano Care Plus com cobertura global, telemedicina internacional e gestão preventiva de saúde.',
            endereco: 'Av. Beira Mar Norte, 3100 - Centro, Florianópolis - SC',
            coberturas: 'Hospitais Sírio-Libanês e Einstein, Check-up anual, Reembolso no exterior',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Renovado com inclusão de tratamento fisioterápico especializado.'
        },
        {
            id: 'pol-25',
            apolice: 'AP-2024-7631',
            cliente: 'Letícia Spiller Fontes',
            cpf: '567.765.890-33',
            email: 'leticia.fontes@email.com',
            telefone: '(21) 98122-4455',
            title: 'Porto Vida Mais Mulher - Letícia Fontes',
            tipoSeguro: 'Seguro de Vida',
            seguradora: 'Porto Seguro',
            valor: 'R$ 2.450,00',
            franquia: 'Isento',
            vigenciaInicio: '10/04/2026',
            vigenciaFim: '10/04/2027',
            status: 'todo',
            tag: 'Vida',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'LF',
            date: '10 Abr 2026',
            desc: 'Seguro de vida voltado para mulheres com cobertura diagnóstica de câncer de mama e ginecológico.',
            endereco: 'Rua São Clemente, 280 - Botafogo, Rio de Janeiro - RJ',
            coberturas: 'Capital Segurado R$ 1.2M, Diagnóstico de Câncer R$ 150k, Segunda Opinião Médica Internacional',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Aguardando confirmação do pagamento da primeira parcela.'
        },
        {
            id: 'pol-26',
            apolice: 'AP-2024-4820',
            cliente: 'Danielle Winits Barreto',
            cpf: '678.876.901-44',
            email: 'danielle.barreto@email.com',
            telefone: '(11) 97233-5566',
            title: 'Apólice Porsche Macan - Danielle Barreto',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'Tokio Marine',
            valor: 'R$ 14.800,00',
            franquia: 'R$ 5.500,00',
            vigenciaInicio: '01/03/2026',
            vigenciaFim: '01/03/2027',
            status: 'doing',
            tag: 'Auto',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'DB',
            date: '01 Mar 2026',
            desc: 'Porsche Macan GTS 2024. Cobertura de pintura cerâmica, rodas aro 21 e teto panorâmico.',
            endereco: 'Rua Bela Cintra, 1800 - Consolação, São Paulo - SP',
            coberturas: 'FIPE 100% Reposição zero km por 1 ano, Danos Morais R$ 300k, Carro reserva SUV Luxo',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Instalação de localizador homologado e laudo cautelar aprovado.'
        },
        {
            id: 'pol-27',
            apolice: 'AP-2024-8501',
            cliente: 'Caio Castro Castanheira',
            cpf: '789.987.012-55',
            email: 'caio.castanheira@email.com',
            telefone: '(11) 98344-6677',
            title: 'Apólice Moto Ducati - Caio Castanheira',
            tipoSeguro: 'Seguro Automóvel',
            seguradora: 'Allianz Seguros',
            valor: 'R$ 6.300,00',
            franquia: 'R$ 3.200,00',
            vigenciaInicio: '15/01/2026',
            vigenciaFim: '15/01/2027',
            status: 'done',
            tag: 'Auto',
            priority: 'Alta',
            priorityColor: '#ef4444',
            assignee: 'CC',
            date: '15 Jan 2026',
            desc: 'Ducati Panigale V4 S. Cobertura especial para macacão, capacete e equipamentos de segurança.',
            endereco: 'Av. Brigadeiro Faria Lima, 3900 - Itaim Bibi, São Paulo - SP',
            coberturas: 'Roubo/Furto, Colisão, Acessórios e Indumentária do Piloto (R$ 25.000,00)',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Piloto experiente com histórico de zero sinistros em apólices de moto.'
        },
        {
            id: 'pol-28',
            apolice: 'AP-2024-3990',
            cliente: 'Taís Araújo Ramos',
            cpf: '890.098.123-66',
            email: 'tais.ramos@email.com',
            telefone: '(21) 99122-7788',
            title: 'Cobertura Duplex Leblon - Taís Ramos',
            tipoSeguro: 'Seguro Residencial',
            seguradora: 'SulAmérica',
            valor: 'R$ 4.500,00',
            franquia: 'R$ 1.500,00',
            vigenciaInicio: '01/02/2026',
            vigenciaFim: '01/02/2027',
            status: 'doing',
            tag: 'Residencial',
            priority: 'Média',
            priorityColor: '#f59e0b',
            assignee: 'TR',
            date: '01 Fev 2026',
            desc: 'Cobertura duplex com piscina e deck no Leblon. Proteção ampla para equipamentos, vazamentos e impacto de veículos/aeronaves.',
            endereco: 'Av. Delfim Moreira, 800 - Leblon, Rio de Janeiro - RJ',
            coberturas: 'Incêndio (R$ 3M), Vazamento de Tubulações (R$ 100k), Danos a Terceiros (R$ 300k)',
            sinistros: 'Nenhum sinistro registrado',
            observacoes: 'Apólice conta com serviços emergenciais ilimitados de eletricista, encanador e chaveiro.'
        }
    ];

    const STATUSES = [
        { id: 'todo', label: 'Em Análise', color: '#64748b', bg: '#f1f5f9' },
        { id: 'doing', label: 'Ativa / Vigente', color: '#3b82f6', bg: '#eff6ff' },
        { id: 'done', label: 'Renovada', color: '#10b981', bg: '#ecfdf5' }
    ];

    // ========================================================
    // 2. ESTADO DA APLICAÇÃO (VIEWS MODULARES)
    // ========================================================
    const availableViews = [
        {
            id: 'view-kanban-1',
            title: 'Gestão de Apólices (Kanban)',
            type: 'kanban', // suporta 'kanban', 'gallery', 'table', 'list-detail'
            mode: 'kanban',
            filterText: '',
            cards: JSON.parse(JSON.stringify(INITIAL_POLICIES))
        },
        {
            id: 'view-gallery-1',
            title: 'Catálogo de Segurados (Galeria)',
            type: 'kanban',
            mode: 'gallery',
            filterText: '',
            cards: JSON.parse(JSON.stringify(INITIAL_POLICIES))
        },
        {
            id: 'view-table-1',
            title: 'Tabela de Apólices',
            type: 'kanban',
            mode: 'table',
            filterText: '',
            cards: JSON.parse(JSON.stringify(INITIAL_POLICIES))
        },
        {
            id: 'view-list-detail-1',
            title: 'Consulta Rápida (Lista & Detalhe)',
            type: 'kanban',
            mode: 'list-detail',
            selectedCardId: 'pol-1',
            filterText: '',
            cards: JSON.parse(JSON.stringify(INITIAL_POLICIES))
        },
        {
            id: 'view-doc-1',
            title: 'Regras de Subscrição',
            type: 'doc',
            content: '### Manual de Subscrição de Apólices\n\nDiretrizes para aprovação de risco e concessão de descontos:\n\n1. Clientes com mais de 3 anos sem sinistros têm 15% de bônus automático.\n2. Veículos acima de R$ 150.000 exigem rastreador homologado.\n3. Cobertura de vidros completos pode ser incluída sem franquia adicional.'
        }
    ];

    // Views abertas por padrão e controle de foco
    let openViewIds = ['view-kanban-1', 'view-list-detail-1'];
    let focusedViewId = 'view-kanban-1';
    let layoutMode = 'stacked'; // 'stacked' ou 'side-by-side'
    const viewSizes = new Map();

    // ========================================================
    // UTILITÁRIOS: NORMALIZAÇÃO DE TEXTO E BUSCA INSENSÍVEL A ACENTOS E CASE
    // ========================================================
    function normalizeStr(str) {
        if (!str) return '';
        return str
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, (m) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m]));
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function buildAccentInsensitiveRegex(term) {
        if (!term) return null;
        const accentMap = {
            'a': '[aáàãâäAÁÀÃÂÄ]',
            'e': '[eéèêëEÉÈÊË]',
            'i': '[iíìîïIÍÌÎÏ]',
            'o': '[oóòõôöOÓÒÕÔÖ]',
            'u': '[uúùûüUÚÙÛÜ]',
            'c': '[cçCÇ]'
        };
        let pattern = '';
        for (let char of term) {
            const lower = char.toLowerCase();
            const base = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (accentMap[base]) {
                pattern += accentMap[base];
            } else {
                pattern += escapeRegex(char);
            }
        }
        return new RegExp(`(${pattern})`, 'gi');
    }

    const SEARCH_STOPWORDS = new Set(['de', 'do', 'da', 'dos', 'das', 'o', 'a', 'os', 'as', 'e', 'em', 'no', 'na', 'nos', 'nas', 'por', 'com', 'x', 'vs']);

    function extractSearchTokens(queryStr) {
        const norm = normalizeStr(queryStr);
        if (!norm) return [];
        return norm
            .split(/[\s,;:+/|\\-]+/)
            .filter((tok) => tok.length > 0 && !SEARCH_STOPWORDS.has(tok));
    }

    function buildPolicyHaystack(p) {
        if (!p) return '';
        return normalizeStr([
            p.cliente,
            p.apolice,
            p.tipoSeguro,
            p.seguradora,
            p.tag,
            p.cpf,
            p.email,
            p.telefone,
            p.desc,
            p.coberturas,
            p.endereco,
            p.observacoes,
            'seguradora',
            'cliente',
            'segurado',
            'apolice',
            'ramo',
            'tipo',
            'auto',
            'saude',
            'vida',
            'residencial',
            'empresarial'
        ].join(' '));
    }

    function matchPolicyTokens(p, tokens) {
        if (!tokens || tokens.length === 0) return true;
        const haystack = buildPolicyHaystack(p);
        return tokens.every((tok) => haystack.includes(tok));
    }

    function highlightAccentInsensitive(text, term) {
        if (!text) return '';
        const safeText = escapeHtml(text);
        if (!term || !term.trim()) return safeText;
        try {
            const rawTokens = term.trim().split(/\s+/).filter(Boolean);
            const tokens = rawTokens.filter((t) => !SEARCH_STOPWORDS.has(normalizeStr(t)));
            const activeTokens = tokens.length > 0 ? tokens : rawTokens;
            if (activeTokens.length === 0) return safeText;

            const patterns = activeTokens.map((tok) => {
                let p = '';
                for (let char of tok) {
                    const lower = char.toLowerCase();
                    const base = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    const accentMap = {
                        'a': '[aáàãâäAÁÀÃÂÄ]',
                        'e': '[eéèêëEÉÈÊË]',
                        'i': '[iíìîïIÍÌÎÏ]',
                        'o': '[oóòõôöOÓÒÕÔÖ]',
                        'u': '[uúùûüUÚÙÛÜ]',
                        'c': '[cçCÇ]'
                    };
                    p += accentMap[base] || escapeRegex(char);
                }
                return p;
            });
            const regex = new RegExp(`(${patterns.join('|')})`, 'gi');
            return safeText.replace(regex, '<mark>$1</mark>');
        } catch (err) {
            return safeText;
        }
    }

    // Elementos DOM principais
    const navItemExplorer = document.getElementById('navItemExplorer');
    const aside = document.getElementById('mAside');
    const asideSectionList = document.getElementById('asideSectionList');
    const btnAddSection = document.getElementById('btnAddSection');
    const addViewMenu = document.getElementById('addViewMenu');
    const btnToggleLayout = document.getElementById('btnToggleLayout');
    const asideIndicator = document.querySelector('.aside-indicator');
    const main = document.getElementById('mMain');
    const btnCloseAsideMobile = document.getElementById('btnCloseAsideMobile');

    // ========================================================
    // 3. RENDERIZAÇÃO DO ASIDE (LISTA DE VIEWS)
    // ========================================================
    function renderAside() {
        if (!asideSectionList) return;
        asideSectionList.innerHTML = '';

        availableViews.forEach((v) => {
            const isOpen = openViewIds.includes(v.id);
            const isFocused = v.id === focusedViewId;

            const item = document.createElement('div');
            item.className = `aside-section-item ${isOpen ? 'is-open' : ''} ${isFocused ? 'is-focused' : ''}`;
            item.dataset.viewId = v.id;
            item.title = isOpen
                ? `View "${v.title}" está aberta ${isFocused ? '(em foco)' : '(clique para focar)'}`
                : `Clique para abrir a view "${v.title}"`;

            let iconName = 'article';
            let modeName = 'Doc';
            if (v.type === 'kanban') {
                if (v.mode === 'gallery') iconName = 'grid_view';
                else if (v.mode === 'table') iconName = 'table_rows';
                else if (v.mode === 'list-detail') iconName = 'view_sidebar';
                else iconName = 'view_kanban';

                modeName = v.mode === 'gallery' ? 'Galeria' : (v.mode === 'table' ? 'Tabela' : (v.mode === 'list-detail' ? 'Lista & Detalhe' : 'Kanban'));
            } else if (v.type === 'cadastro') {
                iconName = 'badge';
                modeName = 'Cadastro';
            }

            item.innerHTML = `
                <div class="aside-item-icon"><span class="material-symbols-rounded">${iconName}</span></div>
                <div class="aside-item-title">${escapeHtml(v.title)} <small style="opacity: 0.65; font-size: 0.72rem; margin-left: 4px;">(${modeName})</small></div>
                <span class="aside-item-badge">${isOpen ? (isFocused ? 'em foco' : 'aberta') : 'fechada'}</span>
            `;

            item.addEventListener('click', () => {
                if (!isOpen) {
                    openView(v.id);
                } else {
                    focusView(v.id);
                }
            });

            asideSectionList.appendChild(item);
        });
    }

    // ========================================================
    // 4. RENDERIZAÇÃO DO MAIN (VIEWS / ESTADO VAZIO)
    // ========================================================
    function renderMain() {
        if (!main) return;
        main.innerHTML = '';

        if (layoutMode === 'side-by-side') {
            main.classList.add('is-side-by-side');
            if (btnToggleLayout) {
                btnToggleLayout.innerHTML = '<span class="material-symbols-rounded">view_agenda</span>';
                btnToggleLayout.title = 'Alternar para empilhado (cima / baixo)';
            }
        } else {
            main.classList.remove('is-side-by-side');
            if (btnToggleLayout) {
                btnToggleLayout.innerHTML = '<span class="material-symbols-rounded">view_column</span>';
                btnToggleLayout.title = 'Alternar para lado a lado';
            }
        }

        if (openViewIds.length === 0) {
            focusedViewId = null;
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.innerHTML = `
                <div class="empty-state-icon"><span class="material-symbols-rounded">layers_clear</span></div>
                <h2 class="empty-state-title">Nenhuma view aberta</h2>
                <p class="empty-state-desc">Selecione uma view no menu lateral ou clique no botão abaixo para abrir a Gestão de Apólices.</p>
                <button id="btnOpenDefault" class="empty-state-btn" type="button">
                    <span class="material-symbols-rounded" style="vertical-align: middle; margin-right: 4px; font-size: 18px;">add</span>Abrir Gestão de Apólices
                </button>
            `;

            empty.querySelector('#btnOpenDefault')?.addEventListener('click', () => {
                openView('view-kanban-1');
            });

            main.appendChild(empty);
            return;
        }

        if (!openViewIds.includes(focusedViewId)) {
            focusedViewId = openViewIds[0] || null;
        }

        openViewIds.forEach((id, index) => {
            const vData = availableViews.find((v) => v.id === id) || {
                id,
                title: id,
                type: 'kanban',
                mode: 'kanban',
                cards: []
            };
            const flexRatio = viewSizes.get(id) || 1;
            const isFocused = id === focusedViewId;

            const sectionEl = document.createElement('section');
            sectionEl.id = id;
            sectionEl.className = `main-section ${isFocused ? 'is-focused' : ''}`;
            sectionEl.tabIndex = 0;
            sectionEl.style.flex = `${flexRatio} 1 0px`;
            sectionEl.dataset.id = id;

            let headerIcon = 'article';
            if (vData.type === 'kanban') {
                if (vData.mode === 'gallery') headerIcon = 'grid_view';
                else if (vData.mode === 'table') headerIcon = 'table_rows';
                else if (vData.mode === 'list-detail') headerIcon = 'view_sidebar';
                else headerIcon = 'view_kanban';
            } else if (vData.type === 'cadastro') {
                headerIcon = 'badge';
            }

            const isFirst = index === 0;
            const isLast = index === openViewIds.length - 1;
            const movePrevIcon = layoutMode === 'stacked'
                ? '<span class="material-symbols-rounded">arrow_upward</span>'
                : '<span class="material-symbols-rounded">arrow_back</span>';
            const moveNextIcon = layoutMode === 'stacked'
                ? '<span class="material-symbols-rounded">arrow_downward</span>'
                : '<span class="material-symbols-rounded">arrow_forward</span>';

            sectionEl.innerHTML = `
                <header class="section-header" draggable="true" title="Arraste para reordenar esta view">
                    <div class="section-header-left">
                        <span class="section-icon"><span class="material-symbols-rounded">${headerIcon}</span></span>
                        <span class="section-title">${escapeHtml(vData.title)}</span>
                        <span class="section-focus-indicator"><i class="focus-dot"></i>Em foco</span>
                    </div>
                    <div class="section-header-actions">
                        <button class="section-btn btn-move-prev" type="button" title="Mover para antes (Alt + ←)" ${isFirst ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>${movePrevIcon}</button>
                        <button class="section-btn btn-move-next" type="button" title="Mover para depois (Alt + →)" ${isLast ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>${moveNextIcon}</button>
                        <button class="section-close" type="button" aria-label="Fechar ${escapeHtml(vData.title)} (Alt + W)" title="Fechar view (Alt + W)"><span class="material-symbols-rounded">close</span></button>
                    </div>
                </header>
                <div class="section-body"></div>
            `;

            sectionEl.addEventListener('pointerdown', () => {
                setFocusedView(id);
            });

            sectionEl.addEventListener('focusin', () => {
                setFocusedView(id);
            });

            sectionEl.querySelector('.section-close')?.addEventListener('click', (e) => {
                e.stopPropagation();
                closeView(id);
            });

            sectionEl.querySelector('.btn-move-prev')?.addEventListener('click', (e) => {
                e.stopPropagation();
                moveView(index, -1);
            });

            sectionEl.querySelector('.btn-move-next')?.addEventListener('click', (e) => {
                e.stopPropagation();
                moveView(index, 1);
            });

            const header = sectionEl.querySelector('.section-header');
            setupDragAndDrop(sectionEl, header, id);

            const bodyEl = sectionEl.querySelector('.section-body');
            renderViewBody(vData, bodyEl);

            main.appendChild(sectionEl);

            if (index < openViewIds.length - 1) {
                const divider = document.createElement('div');
                divider.className = 'section-divider';
                divider.dataset.dividerIndex = index;
                divider.title = 'Arraste para redimensionar ou duplo clique para alternar layout';
                divider.innerHTML = `<span class="indicator-dots"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>`;

                setupSectionDividerResize(divider, index);

                divider.addEventListener('dblclick', () => {
                    toggleLayout();
                });

                main.appendChild(divider);
            }
        });
    }

    // ========================================================
    // 5. RENDERIZAÇÃO DO CORPO DA VIEW (KANBAN, GALERIA, TABELA, CADASTRO OU DOC)
    // ========================================================
    function renderViewBody(view, containerEl) {
        if (!containerEl) return;
        containerEl.innerHTML = '';

        // TIPO 1: KANBAN / GALERIA / TABELA
        if (view.type === 'kanban') {
            const viewContainer = document.createElement('div');
            viewContainer.className = 'view-container';

            const filteredCards = getFilteredCards(view);

            // Toolbar superior com toggle para [Kanban] [Galeria] [Tabela]
            const toolbar = document.createElement('div');
            toolbar.className = 'view-toolbar';
            toolbar.innerHTML = `
                <div class="view-toolbar-left">
                    <div class="view-search-box">
                        <span class="material-symbols-rounded view-search-icon">search</span>
                        <input type="text" class="view-filter-input" placeholder="Filtrar por segurado, apólice ou placa..." value="${escapeHtml(view.filterText || '')}">
                        ${view.filterText ? '<button class="view-filter-clear" type="button" title="Limpar busca"><span class="material-symbols-rounded">close</span></button>' : ''}
                    </div>
                </div>
                <div class="view-toolbar-right">
                    <div class="view-mode-toggle" role="group" aria-label="Modo de visualização">
                        <button type="button" class="mode-toggle-btn btn-mode-kanban ${view.mode === 'kanban' ? 'is-active' : ''}" title="Visualização em Colunas Kanban">
                            <span class="material-symbols-rounded">view_kanban</span>
                            <span>Kanban</span>
                        </button>
                        <button type="button" class="mode-toggle-btn btn-mode-gallery ${view.mode === 'gallery' ? 'is-active' : ''}" title="Visualização em Grade de Galeria">
                            <span class="material-symbols-rounded">grid_view</span>
                            <span>Galeria</span>
                        </button>
                        <button type="button" class="mode-toggle-btn btn-mode-table ${view.mode === 'table' ? 'is-active' : ''}" title="Visualização em Tabela">
                            <span class="material-symbols-rounded">table_rows</span>
                            <span>Tabela</span>
                        </button>
                        <button type="button" class="mode-toggle-btn btn-mode-list-detail ${view.mode === 'list-detail' ? 'is-active' : ''}" title="Visualização em Lista & Detalhes">
                            <span class="material-symbols-rounded">view_sidebar</span>
                            <span>Lista & Detalhe</span>
                        </button>
                    </div>
                    <span class="view-item-count">${filteredCards.length} ${filteredCards.length === 1 ? 'apólice' : 'apólices'}</span>
                    <button type="button" class="view-add-card-btn" title="Adicionar nova apólice fictícia">
                        <span class="material-symbols-rounded">add</span>
                        <span>Nova Apólice</span>
                    </button>
                </div>
            `;

            const input = toolbar.querySelector('.view-filter-input');
            input?.addEventListener('input', (e) => {
                view.filterText = e.target.value;
                renderViewContent(view, contentEl);
                const countBadge = toolbar.querySelector('.view-item-count');
                const currentFiltered = getFilteredCards(view);
                if (countBadge) {
                    countBadge.textContent = `${currentFiltered.length} ${currentFiltered.length === 1 ? 'apólice' : 'apólices'}`;
                }
            });

            toolbar.querySelector('.view-filter-clear')?.addEventListener('click', () => {
                view.filterText = '';
                renderViewBody(view, containerEl);
            });

            toolbar.querySelector('.btn-mode-kanban')?.addEventListener('click', () => {
                if (view.mode !== 'kanban') {
                    view.mode = 'kanban';
                    renderMain();
                    renderAside();
                }
            });

            toolbar.querySelector('.btn-mode-gallery')?.addEventListener('click', () => {
                if (view.mode !== 'gallery') {
                    view.mode = 'gallery';
                    renderMain();
                    renderAside();
                }
            });

            toolbar.querySelector('.btn-mode-table')?.addEventListener('click', () => {
                if (view.mode !== 'table') {
                    view.mode = 'table';
                    renderMain();
                    renderAside();
                }
            });

            toolbar.querySelector('.btn-mode-list-detail')?.addEventListener('click', () => {
                if (view.mode !== 'list-detail') {
                    view.mode = 'list-detail';
                    renderMain();
                    renderAside();
                }
            });

            toolbar.querySelector('.view-add-card-btn')?.addEventListener('click', () => {
                const nextNum = (view.cards || []).length + 1;
                const newPolicy = {
                    id: `pol-${Date.now()}`,
                    apolice: `AP-2024-${Math.floor(1000 + Math.random() * 9000)}`,
                    cliente: `Novo Segurado #${nextNum}`,
                    cpf: '000.000.000-00',
                    email: `segurado${nextNum}@email.com`,
                    telefone: '(11) 90000-0000',
                    title: `Nova Apólice #${nextNum}`,
                    tipoSeguro: 'Seguro Automóvel',
                    seguradora: 'Porto Seguro',
                    valor: 'R$ 2.950,00',
                    franquia: 'R$ 1.000,00',
                    vigenciaInicio: 'Hoje',
                    vigenciaFim: 'Em 1 ano',
                    status: 'todo',
                    tag: 'Auto',
                    priority: 'Média',
                    priorityColor: '#f59e0b',
                    assignee: 'NS',
                    date: 'Hoje',
                    desc: 'Veículo em processo de emissão e vistoria prévia.',
                    endereco: 'São Paulo - SP',
                    coberturas: 'Compreensiva Básica',
                    sinistros: 'Nenhum sinistro registrado',
                    observacoes: 'Apólice recém-cadastrada.'
                };
                view.cards.push(newPolicy);
                renderViewContent(view, contentEl);
                const countBadge = toolbar.querySelector('.view-item-count');
                const currentFiltered = getFilteredCards(view);
                if (countBadge) {
                    countBadge.textContent = `${currentFiltered.length} ${currentFiltered.length === 1 ? 'apólice' : 'apólices'}`;
                }
            });

            viewContainer.appendChild(toolbar);

            const contentEl = document.createElement('div');
            contentEl.className = 'view-content';
            renderViewContent(view, contentEl);

            viewContainer.appendChild(contentEl);
            containerEl.appendChild(viewContainer);
            return;
        }

        // TIPO 2: CADASTRO DEDICADO DE APÓLICE (VIEW NO WORKSPACE)
        if (view.type === 'cadastro') {
            const p = view.policy || INITIAL_POLICIES[0];
            const statusObj = STATUSES.find((s) => s.id === p.status) || STATUSES[0];

            const cadView = document.createElement('div');
            cadView.className = 'cadastro-view-container';
            cadView.innerHTML = `
                <div class="cadastro-hero">
                    <div class="cadastro-hero-left">
                        <div class="cadastro-hero-avatar">${escapeHtml(p.assignee || 'CL')}</div>
                        <div>
                            <div class="cadastro-hero-title">
                                <span>${escapeHtml(p.cliente)}</span>
                                <span class="modal-policy-badge">${escapeHtml(p.apolice)}</span>
                                <span class="gallery-status-pill" style="background-color: ${statusObj.bg}; color: ${statusObj.color};">
                                    <i class="priority-dot" style="background-color: ${statusObj.color}; width: 6px; height: 6px;"></i>
                                    ${statusObj.label}
                                </span>
                            </div>
                            <div class="cadastro-hero-sub">${escapeHtml(p.tipoSeguro)} • ${escapeHtml(p.seguradora)}</div>
                        </div>
                    </div>
                    <div class="cadastro-hero-stats">
                        <div class="hero-stat-item">
                            <span class="hero-stat-label">Valor Prêmio</span>
                            <span class="hero-stat-val">${escapeHtml(p.valor)}</span>
                        </div>
                        <div class="hero-stat-item">
                            <span class="hero-stat-label">Vigência</span>
                            <span class="hero-stat-val" style="font-size: 0.85rem;">${escapeHtml(p.vigenciaInicio)} a ${escapeHtml(p.vigenciaFim)}</span>
                        </div>
                    </div>
                </div>

                <div class="cadastro-card-grid">
                    <div class="cadastro-box">
                        <div class="cadastro-box-title"><span class="material-symbols-rounded">person</span> Dados do Segurado</div>
                        <div class="field-pair"><span class="label">Nome Completo:</span><span class="value">${escapeHtml(p.cliente)}</span></div>
                        <div class="field-pair"><span class="label">CPF:</span><span class="value">${escapeHtml(p.cpf || '123.456.789-00')}</span></div>
                        <div class="field-pair"><span class="label">E-mail:</span><span class="value">${escapeHtml(p.email || 'cliente@email.com')}</span></div>
                        <div class="field-pair"><span class="label">Telefone:</span><span class="value">${escapeHtml(p.telefone || '(11) 99999-9999')}</span></div>
                        <div class="field-pair"><span class="label">Endereço:</span><span class="value">${escapeHtml(p.endereco || 'Endereço não informado')}</span></div>
                    </div>

                    <div class="cadastro-box">
                        <div class="cadastro-box-title"><span class="material-symbols-rounded">policy</span> Detalhes da Apólice</div>
                        <div class="field-pair"><span class="label">Seguradora:</span><span class="value">${escapeHtml(p.seguradora)}</span></div>
                        <div class="field-pair"><span class="label">Ramo / Produto:</span><span class="value">${escapeHtml(p.tipoSeguro)}</span></div>
                        <div class="field-pair"><span class="label">Franquia:</span><span class="value">${escapeHtml(p.franquia || 'R$ 1.000,00')}</span></div>
                        <div class="field-pair"><span class="label">Vigência:</span><span class="value">${escapeHtml(p.vigenciaInicio)} até ${escapeHtml(p.vigenciaFim)}</span></div>
                        <div class="field-pair"><span class="label">Status:</span>
                            <select class="gallery-status-select cad-status-changer" style="width: fit-content; margin-top: 3px;">
                                <option value="todo" ${p.status === 'todo' ? 'selected' : ''}>Em Análise</option>
                                <option value="doing" ${p.status === 'doing' ? 'selected' : ''}>Ativa / Vigente</option>
                                <option value="done" ${p.status === 'done' ? 'selected' : ''}>Renovada</option>
                            </select>
                        </div>
                    </div>

                    <div class="cadastro-box">
                        <div class="cadastro-box-title"><span class="material-symbols-rounded">verified_user</span> Coberturas Contratadas</div>
                        <div class="field-pair"><span class="label">Coberturas Principais:</span><span class="value">${escapeHtml(p.coberturas || 'Compreensiva 100% FIPE')}</span></div>
                        <div class="field-pair"><span class="label">Histórico de Sinistros:</span><span class="value">${escapeHtml(p.sinistros || 'Nenhum sinistro')}</span></div>
                    </div>

                    <div class="cadastro-box">
                        <div class="cadastro-box-title"><span class="material-symbols-rounded">notes</span> Observações e Notas</div>
                        <textarea class="doc-view-textarea" style="min-height: 80px;" placeholder="Adicione notas da apólice...">${escapeHtml(p.observacoes || p.desc || '')}</textarea>
                    </div>
                </div>
            `;

            cadView.querySelector('.cad-status-changer')?.addEventListener('change', (e) => {
                p.status = e.target.value;
                renderAside();
                renderViewBody(view, containerEl);
            });

            containerEl.appendChild(cadView);
            return;
        }

        // TIPO 3: DOCUMENTO / NOTAS
        if (view.type === 'doc') {
            const docEl = document.createElement('div');
            docEl.className = 'doc-view';
            docEl.innerHTML = `
                <div class="doc-view-title">${escapeHtml(view.title)}</div>
                <textarea class="doc-view-textarea" placeholder="Digite anotações ou especificações aqui...">${escapeHtml(view.content || '')}</textarea>
            `;
            docEl.querySelector('.doc-view-textarea')?.addEventListener('input', (e) => {
                view.content = e.target.value;
            });
            containerEl.appendChild(docEl);
        }
    }

    function getFilteredCards(view) {
        const raw = (view.filterText || '').trim();
        if (!raw) return view.cards || [];
        const tokens = extractSearchTokens(raw);
        if (tokens.length === 0) return view.cards || [];
        return (view.cards || []).filter((c) => matchPolicyTokens(c, tokens));
    }

    // ========================================================
    // 6. RENDERIZAÇÃO DOS MODOS: KANBAN, GALERIA OU TABELA
    // ========================================================
    function renderViewContent(view, containerEl) {
        if (!containerEl) return;
        containerEl.innerHTML = '';
        const filteredCards = getFilteredCards(view);
        const query = (view.filterText || '').trim();

        // ----------------------------------------------------
        // MODO 1: KANBAN BOARD
        // ----------------------------------------------------
        if (view.mode === 'kanban') {
            const boardEl = document.createElement('div');
            boardEl.className = 'kanban-board';

            STATUSES.forEach((st) => {
                const columnCards = filteredCards.filter((c) => c.status === st.id);

                const colEl = document.createElement('div');
                colEl.className = 'kanban-column';
                colEl.dataset.status = st.id;

                colEl.innerHTML = `
                    <div class="kanban-col-header">
                        <div class="col-header-left">
                            <span class="col-status-dot" style="background-color: ${st.color}"></span>
                            <span>${st.label}</span>
                        </div>
                        <span class="col-count-badge">${columnCards.length}</span>
                    </div>
                    <div class="kanban-cards-track" data-status="${st.id}"></div>
                `;

                const track = colEl.querySelector('.kanban-cards-track');

                columnCards.forEach((card) => {
                    const cardEl = document.createElement('div');
                    cardEl.className = 'kanban-card';
                    cardEl.draggable = true;
                    cardEl.dataset.cardId = card.id;

                    const titleHtml = highlightAccentInsensitive(card.cliente || card.title, query);
                    const descHtml = highlightAccentInsensitive(card.desc || '', query);

                    cardEl.innerHTML = `
                        <div class="card-top-meta">
                            <span class="table-policy-cell" style="font-size: 0.65rem;">${escapeHtml(card.apolice || card.id)}</span>
                            <div style="display: flex; align-items: center; gap: 4px;">
                                <span class="card-tag">${escapeHtml(card.tag || 'Auto')}</span>
                                <button class="card-open-btn btn-open-view" type="button" title="Abrir como View independente no Workspace">
                                    <span class="material-symbols-rounded">open_in_new</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-title">${titleHtml}</div>
                        ${descHtml ? `<div class="card-desc">${descHtml}</div>` : ''}
                        <div class="card-footer">
                            <div style="display: flex; align-items: center; gap: 4px;">
                                <span class="card-assignee" title="Segurado: ${card.cliente}">${card.assignee || 'CL'}</span>
                                <span style="font-size: 0.72rem; font-weight: 700; color: var(--color-text-primary);">${escapeHtml(card.valor || '')}</span>
                            </div>
                            <span class="card-date"><span class="material-symbols-rounded">schedule</span>${card.date || 'Hoje'}</span>
                        </div>
                    `;

                    // Clique no card abre diretamente como view no workspace
                    cardEl.addEventListener('click', () => {
                        openCadastroView(card);
                    });

                    setupCardDrag(cardEl, card.id, view.id);
                    track.appendChild(cardEl);
                });

                setupTrackDrop(track, st.id, view);
                boardEl.appendChild(colEl);
            });

            containerEl.appendChild(boardEl);
            return;
        }

        // ----------------------------------------------------
        // MODO 2: GALERIA DE CARDS
        // ----------------------------------------------------
        if (view.mode === 'gallery') {
            const gridEl = document.createElement('div');
            gridEl.className = 'gallery-grid';

            if (filteredCards.length === 0) {
                gridEl.innerHTML = `
                    <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--color-text-muted);">
                        <span class="material-symbols-rounded" style="font-size: 36px; margin-bottom: 8px;">search_off</span>
                        <p style="font-size: 0.9rem;">Nenhuma apólice encontrada para "<strong>${escapeHtml(query)}</strong>"</p>
                    </div>
                `;
                containerEl.appendChild(gridEl);
                return;
            }

            filteredCards.forEach((card) => {
                const cardEl = document.createElement('div');
                cardEl.className = 'gallery-card';

                const statusObj = STATUSES.find((s) => s.id === card.status) || STATUSES[0];

                const titleHtml = highlightAccentInsensitive(card.cliente || card.title, query);
                const descHtml = highlightAccentInsensitive(card.desc || '', query);

                cardEl.innerHTML = `
                    <div class="gallery-card-top">
                        <span class="gallery-status-pill" style="background-color: ${statusObj.bg}; color: ${statusObj.color};">
                            <i class="priority-dot" style="background-color: ${statusObj.color}; width: 6px; height: 6px;"></i>
                            ${statusObj.label}
                        </span>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span class="table-policy-cell" style="font-size: 0.65rem;">${escapeHtml(card.apolice || card.id)}</span>
                            <span class="card-open-btn" title="Abrir no Workspace"><span class="material-symbols-rounded">open_in_new</span></span>
                        </div>
                    </div>
                    <div class="gallery-card-title">${titleHtml}</div>
                    <div class="gallery-card-desc">${descHtml}</div>
                    <div class="gallery-card-footer">
                        <div class="gallery-assignee-info">
                            <span class="card-assignee">${card.assignee || 'CL'}</span>
                            <span style="font-weight: 700; color: var(--color-text-primary); font-size: 0.75rem;">${escapeHtml(card.valor || '')}</span>
                        </div>
                        <select class="gallery-status-select" title="Alterar status da apólice">
                            <option value="todo" ${card.status === 'todo' ? 'selected' : ''}>Em Análise</option>
                            <option value="doing" ${card.status === 'doing' ? 'selected' : ''}>Ativa / Vigente</option>
                            <option value="done" ${card.status === 'done' ? 'selected' : ''}>Renovada</option>
                        </select>
                    </div>
                `;

                // Clique no card abre diretamente a view dedicada
                cardEl.addEventListener('click', (e) => {
                    if (e.target.closest('.gallery-status-select')) {
                        return;
                    }
                    openCadastroView(card);
                });

                cardEl.querySelector('.gallery-status-select')?.addEventListener('change', (e) => {
                    e.stopPropagation();
                    card.status = e.target.value;
                    renderViewContent(view, containerEl);
                });

                gridEl.appendChild(cardEl);
            });

            containerEl.appendChild(gridEl);
            return;
        }

        // ----------------------------------------------------
        // MODO 3: TABELA DE APÓLICES / CLIENTES
        // ----------------------------------------------------
        if (view.mode === 'table') {
            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';

            if (filteredCards.length === 0) {
                tableContainer.innerHTML = `
                    <div style="padding: 2.5rem; text-align: center; color: var(--color-text-muted);">
                        <span class="material-symbols-rounded" style="font-size: 36px; margin-bottom: 8px;">search_off</span>
                        <p style="font-size: 0.9rem;">Nenhuma apólice encontrada para "<strong>${escapeHtml(query)}</strong>"</p>
                    </div>
                `;
                containerEl.appendChild(tableContainer);
                return;
            }

            const table = document.createElement('table');
            table.className = 'view-table';
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Apólice</th>
                        <th>Segurado / Cliente</th>
                        <th>Tipo / Ramo</th>
                        <th>Prêmio Total</th>
                        <th>Status</th>
                        <th>Vigência</th>
                        <th style="text-align: right;">Ação</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            const tbody = table.querySelector('tbody');

            filteredCards.forEach((card) => {
                const tr = document.createElement('tr');
                const statusObj = STATUSES.find((s) => s.id === card.status) || STATUSES[0];

                const clientHtml = highlightAccentInsensitive(card.cliente || card.title, query);
                const polHtml = highlightAccentInsensitive(card.apolice || card.id, query);

                tr.innerHTML = `
                    <td><span class="table-policy-cell">${polHtml}</span></td>
                    <td>
                        <div class="table-client-cell">
                            <span class="card-assignee" style="width: 22px; height: 22px; font-size: 10px;">${escapeHtml(card.assignee || 'CL')}</span>
                            <span>${clientHtml}</span>
                        </div>
                    </td>
                    <td><span class="card-tag">${escapeHtml(card.tipoSeguro || card.tag || 'Auto')}</span></td>
                    <td style="font-weight: 700;">${escapeHtml(card.valor || 'R$ 2.500,00')}</td>
                    <td>
                        <span class="gallery-status-pill" style="background-color: ${statusObj.bg}; color: ${statusObj.color};">
                            <i class="priority-dot" style="background-color: ${statusObj.color}; width: 6px; height: 6px;"></i>
                            ${statusObj.label}
                        </span>
                    </td>
                    <td><span style="font-size: 0.72rem; color: var(--color-text-muted);">${escapeHtml(card.vigenciaInicio || card.date)}</span></td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="table-btn btn-open-view" type="button" title="Abrir como View no Workspace"><span class="material-symbols-rounded">open_in_new</span></button>
                        </div>
                    </td>
                `;

                // Clique na linha abre diretamente como view no workspace
                tr.addEventListener('click', () => {
                    openCadastroView(card);
                });

                tbody.appendChild(tr);
            });

            tableContainer.appendChild(table);
            containerEl.appendChild(tableContainer);
            return;
        }

        // ----------------------------------------------------
        // MODO 4: LISTA & DETALHES (LIST DETAIL)
        // ----------------------------------------------------
        if (view.mode === 'list-detail') {
            const listDetailEl = document.createElement('div');
            listDetailEl.className = 'list-detail-container';

            if (filteredCards.length === 0) {
                listDetailEl.innerHTML = `
                    <div style="flex: 1; padding: 3rem; text-align: center; color: var(--color-text-muted);">
                        <span class="material-symbols-rounded" style="font-size: 36px; margin-bottom: 8px;">search_off</span>
                        <p style="font-size: 0.9rem;">Nenhuma apólice encontrada para "<strong>${escapeHtml(query)}</strong>"</p>
                    </div>
                `;
                containerEl.appendChild(listDetailEl);
                return;
            }

            // Garante que haja um card selecionado
            let currentSelected = filteredCards.find((c) => c.id === view.selectedCardId);
            if (!currentSelected) {
                currentSelected = filteredCards[0];
                view.selectedCardId = currentSelected.id;
            }

            // 1. Painel Esquerdo: Lista de Cards / Segurados
            const masterListEl = document.createElement('div');
            masterListEl.className = 'list-detail-master';
            masterListEl.tabIndex = 0;
            masterListEl.setAttribute('role', 'listbox');
            masterListEl.setAttribute('aria-label', 'Lista de apólices');

            const listItemsWrapper = document.createElement('div');
            listItemsWrapper.className = 'list-detail-items';

            filteredCards.forEach((card) => {
                const isSelected = card.id === view.selectedCardId;
                const statusObj = STATUSES.find((s) => s.id === card.status) || STATUSES[0];

                const itemEl = document.createElement('div');
                itemEl.className = `list-detail-item ${isSelected ? 'is-selected' : ''}`;
                itemEl.dataset.cardId = card.id;
                itemEl.setAttribute('role', 'option');
                itemEl.setAttribute('aria-selected', isSelected ? 'true' : 'false');

                const clientHtml = highlightAccentInsensitive(card.cliente || card.title, query);
                const polHtml = highlightAccentInsensitive(card.apolice || card.id, query);
                const tagHtml = escapeHtml(card.tag || 'Auto');

                itemEl.innerHTML = `
                    <div class="list-item-top">
                        <span class="table-policy-cell" style="font-size: 0.65rem;">${polHtml}</span>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span class="gallery-status-pill" style="background-color: ${statusObj.bg}; color: ${statusObj.color}; font-size: 0.62rem; padding: 1px 5px;">
                                <i class="priority-dot" style="background-color: ${statusObj.color}; width: 5px; height: 5px;"></i>
                                ${statusObj.label}
                            </span>
                            <button class="list-item-detach-btn" type="button" title="Abrir como View independente no Workspace">
                                <span class="material-symbols-rounded">open_in_new</span>
                            </button>
                        </div>
                    </div>
                    <div class="list-item-title">${clientHtml}</div>
                    <div class="list-item-sub">${escapeHtml(card.tipoSeguro || tagHtml)} • ${escapeHtml(card.seguradora || 'Porto Seguro')}</div>
                    <div class="list-item-footer">
                        <span class="list-item-price">${escapeHtml(card.valor || '')}</span>
                        <span class="list-item-date"><span class="material-symbols-rounded">schedule</span>${escapeHtml(card.vigenciaFim ? `Até ${card.vigenciaFim}` : (card.date || 'Hoje'))}</span>
                    </div>
                `;

                // Clicar em qualquer card muda os detalhes instantaneamente sem recriar o DOM da lista
                itemEl.addEventListener('click', () => {
                    selectCard(card.id, true);
                });

                itemEl.querySelector('.list-item-detach-btn')?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openCadastroView(card);
                });

                listItemsWrapper.appendChild(itemEl);
            });

            masterListEl.appendChild(listItemsWrapper);

            // 2. Painel Direito: Detalhes do Card Selecionado
            const detailPaneEl = document.createElement('div');
            detailPaneEl.className = 'list-detail-pane';

            function renderDetailPane(p) {
                if (!p) {
                    detailPaneEl.innerHTML = `
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">
                            <p>Selecione uma apólice na lista ao lado.</p>
                        </div>
                    `;
                    return;
                }

                const statusObj = STATUSES.find((s) => s.id === p.status) || STATUSES[0];
                const currentIndex = filteredCards.findIndex((c) => c.id === p.id);
                const totalCount = filteredCards.length;

                detailPaneEl.innerHTML = `
                    <div class="list-detail-header-nav">
                        <div class="detail-nav-left">
                            <span class="detail-counter-badge">${currentIndex + 1} de ${totalCount}</span>
                            <div class="detail-nav-btns">
                                <button type="button" class="detail-btn-prev" title="Apólice anterior (Seta ↑ ou K)" ${currentIndex === 0 ? 'disabled' : ''}>
                                    <span class="material-symbols-rounded">expand_less</span>
                                </button>
                                <button type="button" class="detail-btn-next" title="Próxima apólice (Seta ↓ ou J)" ${currentIndex === totalCount - 1 ? 'disabled' : ''}>
                                    <span class="material-symbols-rounded">expand_more</span>
                                </button>
                            </div>
                            <span class="detail-help-tip">Navegue com <kbd>↑</kbd> <kbd>↓</kbd></span>
                        </div>
                        <div class="detail-nav-right">
                            <button type="button" class="detail-open-view-btn" title="Abrir esta apólice como View independente no Workspace">
                                <span class="material-symbols-rounded">open_in_new</span>
                                <span>Abrir como View</span>
                            </button>
                        </div>
                    </div>

                    <div class="cadastro-hero" style="margin-bottom: 0.75rem;">
                        <div class="cadastro-hero-left">
                            <div class="cadastro-hero-avatar">${escapeHtml(p.assignee || 'CL')}</div>
                            <div>
                                <div class="cadastro-hero-title">
                                    <span>${escapeHtml(p.cliente)}</span>
                                    <span class="modal-policy-badge">${escapeHtml(p.apolice)}</span>
                                    <span class="gallery-status-pill" style="background-color: ${statusObj.bg}; color: ${statusObj.color};">
                                        <i class="priority-dot" style="background-color: ${statusObj.color}; width: 6px; height: 6px;"></i>
                                        ${statusObj.label}
                                    </span>
                                </div>
                                <div class="cadastro-hero-sub">${escapeHtml(p.tipoSeguro)} • ${escapeHtml(p.seguradora)}</div>
                            </div>
                        </div>
                        <div class="cadastro-hero-stats">
                            <div class="hero-stat-item">
                                <span class="hero-stat-label">Valor Prêmio</span>
                                <span class="hero-stat-val">${escapeHtml(p.valor)}</span>
                            </div>
                            <div class="hero-stat-item">
                                <span class="hero-stat-label">Vigência</span>
                                <span class="hero-stat-val" style="font-size: 0.85rem;">${escapeHtml(p.vigenciaInicio)} a ${escapeHtml(p.vigenciaFim)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="cadastro-card-grid">
                        <div class="cadastro-box">
                            <div class="cadastro-box-title"><span class="material-symbols-rounded">person</span> Dados do Segurado</div>
                            <div class="field-pair"><span class="label">Nome Completo:</span><span class="value">${escapeHtml(p.cliente)}</span></div>
                            <div class="field-pair"><span class="label">CPF:</span><span class="value">${escapeHtml(p.cpf || '123.456.789-00')}</span></div>
                            <div class="field-pair"><span class="label">E-mail:</span><span class="value">${escapeHtml(p.email || 'cliente@email.com')}</span></div>
                            <div class="field-pair"><span class="label">Telefone:</span><span class="value">${escapeHtml(p.telefone || '(11) 99999-9999')}</span></div>
                            <div class="field-pair"><span class="label">Endereço:</span><span class="value">${escapeHtml(p.endereco || 'Endereço não informado')}</span></div>
                        </div>

                        <div class="cadastro-box">
                            <div class="cadastro-box-title"><span class="material-symbols-rounded">policy</span> Detalhes da Apólice</div>
                            <div class="field-pair"><span class="label">Seguradora:</span><span class="value">${escapeHtml(p.seguradora)}</span></div>
                            <div class="field-pair"><span class="label">Ramo / Produto:</span><span class="value">${escapeHtml(p.tipoSeguro)}</span></div>
                            <div class="field-pair"><span class="label">Franquia:</span><span class="value">${escapeHtml(p.franquia || 'R$ 1.000,00')}</span></div>
                            <div class="field-pair"><span class="label">Vigência:</span><span class="value">${escapeHtml(p.vigenciaInicio)} até ${escapeHtml(p.vigenciaFim)}</span></div>
                            <div class="field-pair"><span class="label">Status:</span>
                                <select class="gallery-status-select cad-status-changer" style="width: fit-content; margin-top: 3px;">
                                    <option value="todo" ${p.status === 'todo' ? 'selected' : ''}>Em Análise</option>
                                    <option value="doing" ${p.status === 'doing' ? 'selected' : ''}>Ativa / Vigente</option>
                                    <option value="done" ${p.status === 'done' ? 'selected' : ''}>Renovada</option>
                                </select>
                            </div>
                        </div>

                        <div class="cadastro-box">
                            <div class="cadastro-box-title"><span class="material-symbols-rounded">verified_user</span> Coberturas Contratadas</div>
                            <div class="field-pair"><span class="label">Coberturas Principais:</span><span class="value">${escapeHtml(p.coberturas || 'Compreensiva 100% FIPE')}</span></div>
                            <div class="field-pair"><span class="label">Histórico de Sinistros:</span><span class="value">${escapeHtml(p.sinistros || 'Nenhum sinistro')}</span></div>
                        </div>

                        <div class="cadastro-box">
                            <div class="cadastro-box-title"><span class="material-symbols-rounded">notes</span> Observações e Notas</div>
                            <textarea class="doc-view-textarea detail-notes-input" style="min-height: 80px;" placeholder="Adicione notas da apólice...">${escapeHtml(p.observacoes || p.desc || '')}</textarea>
                        </div>
                    </div>
                `;

                detailPaneEl.querySelector('.detail-btn-prev')?.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        selectCard(filteredCards[currentIndex - 1].id, false);
                    }
                });

                detailPaneEl.querySelector('.detail-btn-next')?.addEventListener('click', () => {
                    if (currentIndex < totalCount - 1) {
                        selectCard(filteredCards[currentIndex + 1].id, false);
                    }
                });

                detailPaneEl.querySelector('.detail-open-view-btn')?.addEventListener('click', () => {
                    openCadastroView(p);
                });

                detailPaneEl.querySelector('.cad-status-changer')?.addEventListener('change', (e) => {
                    p.status = e.target.value;
                    renderAside();
                    const sObj = STATUSES.find((s) => s.id === p.status) || STATUSES[0];
                    const itemStatusPill = masterListEl.querySelector(`.list-detail-item[data-card-id="${p.id}"] .gallery-status-pill`);
                    if (itemStatusPill) {
                        itemStatusPill.style.backgroundColor = sObj.bg;
                        itemStatusPill.style.color = sObj.color;
                        itemStatusPill.innerHTML = `<i class="priority-dot" style="background-color: ${sObj.color}; width: 5px; height: 5px;"></i>${sObj.label}`;
                    }
                    renderDetailPane(p);
                });

                detailPaneEl.querySelector('.detail-notes-input')?.addEventListener('input', (e) => {
                    p.observacoes = e.target.value;
                });
            }

            function selectCard(cardId, shouldFocusMaster = false) {
                view.selectedCardId = cardId;
                const card = filteredCards.find((c) => c.id === cardId);
                if (!card) return;

                masterListEl.querySelectorAll('.list-detail-item').forEach((el) => {
                    const isSel = el.dataset.cardId === cardId;
                    el.classList.toggle('is-selected', isSel);
                    el.setAttribute('aria-selected', isSel ? 'true' : 'false');
                    if (isSel) {
                        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                });

                renderDetailPane(card);

                if (shouldFocusMaster) {
                    masterListEl.focus();
                }
            }

            // Navegação pelo teclado com Setas Cima / Baixo e J / K
            masterListEl.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'j') {
                    e.preventDefault();
                    const curIdx = filteredCards.findIndex((c) => c.id === view.selectedCardId);
                    if (curIdx < filteredCards.length - 1) {
                        selectCard(filteredCards[curIdx + 1].id, true);
                    }
                } else if (e.key === 'ArrowUp' || e.key === 'k') {
                    e.preventDefault();
                    const curIdx = filteredCards.findIndex((c) => c.id === view.selectedCardId);
                    if (curIdx > 0) {
                        selectCard(filteredCards[curIdx - 1].id, true);
                    }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    const curCard = filteredCards.find((c) => c.id === view.selectedCardId);
                    if (curCard) {
                        openCadastroView(curCard);
                    }
                }
            });

            // Inicializa a renderização dos detalhes do card atual
            renderDetailPane(currentSelected);

            listDetailEl.appendChild(masterListEl);
            listDetailEl.appendChild(detailPaneEl);
            containerEl.appendChild(listDetailEl);
            return;
        }
    }

    // ========================================================
    // 7. DRAG & DROP DE CARDS KANBAN
    // ========================================================
    let draggedCardInfo = null;

    function setupCardDrag(cardEl, cardId, viewId) {
        cardEl.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            draggedCardInfo = { cardId, viewId };
            e.dataTransfer.setData('text/plain', cardId);
            e.dataTransfer.effectAllowed = 'move';
            cardEl.classList.add('is-dragging');
        });

        cardEl.addEventListener('dragend', () => {
            cardEl.classList.remove('is-dragging');
            draggedCardInfo = null;
            document.querySelectorAll('.kanban-cards-track').forEach((t) => t.classList.remove('is-drag-target'));
        });
    }

    function setupTrackDrop(trackEl, targetStatus, view) {
        trackEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (draggedCardInfo && draggedCardInfo.viewId === view.id) {
                trackEl.classList.add('is-drag-target');
                e.dataTransfer.dropEffect = 'move';
            }
        });

        trackEl.addEventListener('dragleave', () => {
            trackEl.classList.remove('is-drag-target');
        });

        trackEl.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            trackEl.classList.remove('is-drag-target');

            if (!draggedCardInfo || draggedCardInfo.viewId !== view.id) return;

            const targetCard = view.cards.find((c) => c.id === draggedCardInfo.cardId);
            if (targetCard && targetCard.status !== targetStatus) {
                targetCard.status = targetStatus;
                const contentEl = trackEl.closest('.view-content');
                if (contentEl) {
                    renderViewContent(view, contentEl);
                }
            }
        });
    }

    // ========================================================
    // 8. ABRIR CADASTRO COMO UMA VIEW DEDICADA NO WORKSPACE
    // ========================================================
    function openCadastroView(policy) {
        if (!policy) return;
        const viewId = `view-cadastro-${policy.id}`;

        let existing = availableViews.find((v) => v.id === viewId);
        if (!existing) {
            existing = {
                id: viewId,
                title: `Apólice: ${policy.cliente}`,
                type: 'cadastro',
                policy: policy
            };
            availableViews.push(existing);
        }

        openView(viewId);
    }

    // ========================================================
    // 10. GERENCIAMENTO DE VIEWS (ABRIR, FECHAR, MOVER, CRIAR, FOCAR)
    // ========================================================
    function setFocusedView(id, shouldScroll = false) {
        if (!id || !openViewIds.includes(id)) return;
        focusedViewId = id;
        document.querySelectorAll('.main-section').forEach((sec) => {
            if (sec.id === id) {
                sec.classList.add('is-focused');
            } else {
                sec.classList.remove('is-focused');
            }
        });
        document.querySelectorAll('.aside-section-item').forEach((item) => {
            if (item.dataset.viewId === id) {
                item.classList.add('is-focused');
                const badge = item.querySelector('.aside-item-badge');
                if (badge) badge.textContent = 'em foco';
            } else {
                item.classList.remove('is-focused');
                const badge = item.querySelector('.aside-item-badge');
                if (badge && openViewIds.includes(item.dataset.viewId)) {
                    badge.textContent = 'aberta';
                }
            }
        });
        if (shouldScroll) {
            const el = document.getElementById(id);
            if (el) {
                if (window.innerWidth <= 768 && main) {
                    main.scrollTo({
                        left: el.offsetLeft - 16,
                        behavior: 'smooth'
                    });
                } else {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            }
        }
    }

    function focusView(id) {
        setFocusedView(id, true);
        const el = document.getElementById(id);
        if (el) {
            el.focus({ preventScroll: true });
        }
    }

    function moveFocusedView(direction) {
        if (!focusedViewId || openViewIds.length <= 1) return;
        const currentIndex = openViewIds.indexOf(focusedViewId);
        if (currentIndex === -1) return;
        const targetIndex = currentIndex + direction;
        if (targetIndex < 0 || targetIndex >= openViewIds.length) return;

        const temp = openViewIds[currentIndex];
        openViewIds[currentIndex] = openViewIds[targetIndex];
        openViewIds[targetIndex] = temp;

        renderMain();
        renderAside();

        const el = document.getElementById(focusedViewId);
        if (el) {
            el.focus({ preventScroll: true });
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
    }

    function cycleFocusedView(direction) {
        if (openViewIds.length <= 1) return;
        const currentIndex = openViewIds.indexOf(focusedViewId);
        let nextIndex = 0;
        if (currentIndex !== -1) {
            nextIndex = (currentIndex + direction + openViewIds.length) % openViewIds.length;
        }
        const targetId = openViewIds[nextIndex];
        focusView(targetId);
    }

    function openView(id) {
        if (!openViewIds.includes(id)) {
            openViewIds.push(id);
            if (!viewSizes.has(id)) {
                viewSizes.set(id, 1);
            }
            focusedViewId = id;
            renderMain();
            renderAside();
            setTimeout(() => {
                focusView(id);
            }, 50);
        } else {
            focusView(id);
        }
    }

    function closeView(id) {
        const currIndex = openViewIds.indexOf(id);
        openViewIds = openViewIds.filter((item) => item !== id);
        if (focusedViewId === id) {
            if (openViewIds.length > 0) {
                const nextIdx = Math.min(currIndex, openViewIds.length - 1);
                focusedViewId = openViewIds[nextIdx];
            } else {
                focusedViewId = null;
            }
        }
        renderMain();
        renderAside();
        if (focusedViewId) {
            focusView(focusedViewId);
        }
    }

    function moveView(index, direction) {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= openViewIds.length) return;

        const movedId = openViewIds[index];
        const temp = openViewIds[index];
        openViewIds[index] = openViewIds[targetIndex];
        openViewIds[targetIndex] = temp;

        focusedViewId = movedId;
        renderMain();
        renderAside();
        focusView(movedId);
    }

    function createNewView(type) {
        const count = availableViews.length + 1;
        let newView;

        if (type === 'kanban') {
            newView = {
                id: `view-kanban-${Date.now()}`,
                title: `Gestão de Apólices ${count}`,
                type: 'kanban',
                mode: 'kanban',
                filterText: '',
                cards: JSON.parse(JSON.stringify(INITIAL_POLICIES))
            };
        } else if (type === 'gallery') {
            newView = {
                id: `view-gallery-${Date.now()}`,
                title: `Catálogo Galeria ${count}`,
                type: 'kanban',
                mode: 'gallery',
                filterText: '',
                cards: JSON.parse(JSON.stringify(INITIAL_POLICIES))
            };
        } else if (type === 'table') {
            newView = {
                id: `view-table-${Date.now()}`,
                title: `Tabela de Apólices ${count}`,
                type: 'kanban',
                mode: 'table',
                filterText: '',
                cards: JSON.parse(JSON.stringify(INITIAL_POLICIES))
            };
        } else if (type === 'list-detail') {
            const cardsCopy = JSON.parse(JSON.stringify(INITIAL_POLICIES));
            newView = {
                id: `view-list-detail-${Date.now()}`,
                title: `Consulta Lista & Detalhe ${count}`,
                type: 'kanban',
                mode: 'list-detail',
                filterText: '',
                selectedCardId: cardsCopy[0]?.id || null,
                cards: cardsCopy
            };
        } else {
            newView = {
                id: `view-doc-${Date.now()}`,
                title: `Documento ${count}`,
                type: 'doc',
                content: `### Novo Documento (${count})\n\nEscreva suas anotações ou especificações aqui.`
            };
        }

        availableViews.push(newView);
        openView(newView.id);
    }

    function toggleLayout() {
        layoutMode = layoutMode === 'stacked' ? 'side-by-side' : 'stacked';
        openViewIds.forEach((id) => viewSizes.set(id, 1));
        renderMain();
    }

    // ========================================================
    // 11. DRAG & DROP PARA REORDENAÇÃO DAS VIEWS NO WORKSPACE
    // ========================================================
    let draggedViewId = null;

    function setupDragAndDrop(sectionEl, headerEl, id) {
        headerEl.addEventListener('dragstart', (e) => {
            draggedViewId = id;
            e.dataTransfer.setData('text/plain', id);
            e.dataTransfer.effectAllowed = 'move';
            sectionEl.style.opacity = '0.5';
        });

        headerEl.addEventListener('dragend', () => {
            draggedViewId = null;
            sectionEl.style.opacity = '1';
            document.querySelectorAll('.main-section').forEach((el) => {
                el.classList.remove('is-drag-over');
            });
        });

        sectionEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (draggedViewId && draggedViewId !== id) {
                sectionEl.classList.add('is-drag-over');
            }
        });

        sectionEl.addEventListener('dragleave', () => {
            sectionEl.classList.remove('is-drag-over');
        });

        sectionEl.addEventListener('drop', (e) => {
            e.preventDefault();
            sectionEl.classList.remove('is-drag-over');
            if (!draggedViewId || draggedViewId === id) return;

            const fromIndex = openViewIds.indexOf(draggedViewId);
            const toIndex = openViewIds.indexOf(id);

            if (fromIndex !== -1 && toIndex !== -1) {
                openViewIds.splice(fromIndex, 1);
                openViewIds.splice(toIndex, 0, draggedViewId);
                renderMain();
            }
        });
    }

    // ========================================================
    // 12. REDIMENSIONAMENTO ENTRE VIEWS (DIVIDERS DINÂMICOS)
    // ========================================================
    let activeDividerResize = null;

    function setupSectionDividerResize(dividerEl, dividerIndex) {
        dividerEl.addEventListener('mousedown', (e) => {
            const isCol = layoutMode === 'side-by-side';
            document.body.classList.add(isCol ? 'is-resizing-col' : 'is-resizing-row');

            const idA = openViewIds[dividerIndex];
            const idB = openViewIds[dividerIndex + 1];
            const secA = document.getElementById(idA);
            const secB = document.getElementById(idB);

            if (!secA || !secB) return;

            const rectA = secA.getBoundingClientRect();
            const rectB = secB.getBoundingClientRect();

            activeDividerResize = {
                idA,
                idB,
                secA,
                secB,
                isCol,
                startX: e.clientX,
                startY: e.clientY,
                startSizeA: isCol ? rectA.width : rectA.height,
                startSizeB: isCol ? rectB.width : rectB.height,
                totalSize: isCol ? rectA.width + rectB.width : rectA.height + rectB.height
            };

            e.preventDefault();
        });
    }

    // ========================================================
    // 13. REDIMENSIONAMENTO DO ASIDE (VERTICAL DRAG)
    // ========================================================
    let isResizingAside = false;

    if (asideIndicator && aside) {
        asideIndicator.addEventListener('mousedown', (e) => {
            isResizingAside = true;
            document.body.classList.add('is-resizing-col');
            e.preventDefault();
        });

        asideIndicator.addEventListener('dblclick', () => {
            document.body.style.removeProperty('--aside-width');
        });
    }

    document.addEventListener('mousemove', (e) => {
        if (isResizingAside && aside) {
            const asideRect = aside.getBoundingClientRect();
            const newWidth = e.clientX - asideRect.left;

            if (newWidth >= 50 && newWidth <= window.innerWidth - 200) {
                document.body.style.setProperty('--aside-width', `${newWidth}px`);
            }
        }

        if (activeDividerResize) {
            const { idA, idB, secA, secB, isCol, startX, startY, startSizeA, totalSize } =
                activeDividerResize;

            const delta = isCol ? e.clientX - startX : e.clientY - startY;

            let newSizeA = startSizeA + delta;
            if (newSizeA < 50) newSizeA = 50;
            if (newSizeA > totalSize - 50) newSizeA = totalSize - 50;

            const newSizeB = totalSize - newSizeA;

            const flexA = (newSizeA / totalSize) * 2;
            const flexB = (newSizeB / totalSize) * 2;

            secA.style.flex = `${flexA} 1 0px`;
            secB.style.flex = `${flexB} 1 0px`;

            viewSizes.set(idA, flexA);
            viewSizes.set(idB, flexB);
        }
    });

    const stopAllResizing = () => {
        if (isResizingAside || activeDividerResize) {
            isResizingAside = false;
            activeDividerResize = null;
            document.body.classList.remove('is-resizing-col', 'is-resizing-row');
        }
    };

    document.addEventListener('mouseup', stopAllResizing);
    window.addEventListener('blur', stopAllResizing);

    // ========================================================
    // 14. EVENTOS DOS BOTÕES E NAVEGAÇÃO
    // ========================================================
    if (navItemExplorer) {
        navItemExplorer.addEventListener('click', () => {
            renderAside();

            if (window.innerWidth <= 768 && aside) {
                const willOpen = !aside.classList.contains('is-open-mobile');
                aside.classList.toggle('is-open-mobile');

                document.querySelectorAll('#mNav ul li').forEach((li) => li.classList.remove('is-active'));
                if (willOpen) {
                    navItemExplorer.classList.add('is-active');
                }
            } else {
                document.querySelectorAll('#mNav ul li').forEach((li) => li.classList.remove('is-active'));
                navItemExplorer.classList.add('is-active');
            }
        });
    }

    if (btnCloseAsideMobile && aside) {
        btnCloseAsideMobile.addEventListener('click', () => {
            aside.classList.remove('is-open-mobile');
            if (navItemExplorer) {
                navItemExplorer.classList.remove('is-active');
            }
        });
    }

    const navItemSearch = document.querySelector('#mNav ul li[title="Pesquisa"]');
    if (navItemSearch) {
        navItemSearch.addEventListener('click', () => {
            if (window.innerWidth <= 768 && aside) {
                aside.classList.remove('is-open-mobile');
            }
            document.querySelectorAll('#mNav ul li').forEach((li) => li.classList.remove('is-active'));
            navItemSearch.classList.add('is-active');
            const input = document.getElementById('smartSearchInput');
            if (input) {
                input.focus();
            }
        });
    }

    if (btnAddSection && addViewMenu) {
        btnAddSection.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = addViewMenu.style.display === 'flex';
            addViewMenu.style.display = isOpen ? 'none' : 'flex';
        });

        addViewMenu.querySelectorAll('.add-view-opt').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = btn.dataset.type;
                createNewView(type);
                addViewMenu.style.display = 'none';
            });
        });
    }

    if (btnToggleLayout) {
        btnToggleLayout.addEventListener('click', () => {
            toggleLayout();
        });
    }

    // ========================================================
    // 15. BARRA DE BUSCA INTELIGENTE (COMMAND PALETTE / OMNIBAR)
    // ========================================================
    const smartSearchBar = document.getElementById('smartSearchBar');
    const smartSearchInput = document.getElementById('smartSearchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchResults = document.getElementById('searchResults');

    let selectedIndex = 0;
    let currentResults = [];

    const commandList = [
        {
            id: 'cmd-toggle-layout',
            type: 'command',
            title: 'Alternar Layout (Empilhado / Lado a Lado)',
            icon: 'view_agenda',
            hint: 'Layout (Alt + L)',
            action: () => toggleLayout()
        },
        {
            id: 'cmd-move-prev',
            type: 'command',
            title: 'Mover View em Foco para a Esquerda / Cima',
            icon: 'arrow_back',
            hint: 'Alt + ←',
            action: () => moveFocusedView(-1)
        },
        {
            id: 'cmd-move-next',
            type: 'command',
            title: 'Mover View em Foco para a Direita / Baixo',
            icon: 'arrow_forward',
            hint: 'Alt + →',
            action: () => moveFocusedView(1)
        },
        {
            id: 'cmd-cycle-next',
            type: 'command',
            title: 'Focar Próxima View',
            icon: 'navigate_next',
            hint: 'Alt + ]',
            action: () => cycleFocusedView(1)
        },
        {
            id: 'cmd-cycle-prev',
            type: 'command',
            title: 'Focar View Anterior',
            icon: 'navigate_before',
            hint: 'Alt + [',
            action: () => cycleFocusedView(-1)
        },
        {
            id: 'cmd-new-kanban',
            type: 'command',
            title: 'Criar Nova View: Gestão de Apólices (Kanban)',
            icon: 'view_kanban',
            hint: 'Views',
            action: () => createNewView('kanban')
        },
        {
            id: 'cmd-new-gallery',
            type: 'command',
            title: 'Criar Nova View: Catálogo de Segurados (Galeria)',
            icon: 'grid_view',
            hint: 'Views',
            action: () => createNewView('gallery')
        },
        {
            id: 'cmd-new-table',
            type: 'command',
            title: 'Criar Nova View: Tabela de Apólices',
            icon: 'table_rows',
            hint: 'Views',
            action: () => createNewView('table')
        },
        {
            id: 'cmd-new-list-detail',
            type: 'command',
            title: 'Criar Nova View: Consulta Rápida (Lista & Detalhes)',
            icon: 'view_sidebar',
            hint: 'Views',
            action: () => createNewView('list-detail')
        },
        {
            id: 'cmd-new-doc',
            type: 'command',
            title: 'Criar Nova View: Manual de Regras',
            icon: 'description',
            hint: 'Views',
            action: () => createNewView('doc')
        },
        {
            id: 'cmd-open-claudio',
            type: 'command',
            title: 'Abrir View: Apólice de Claudio Silveira',
            icon: 'badge',
            hint: 'Atalho Direto',
            action: () => {
                const claudio = INITIAL_POLICIES.find((p) => normalizeStr(p.cliente).includes('claudio'));
                if (claudio) openCadastroView(claudio);
            }
        },
        {
            id: 'cmd-open-all',
            type: 'command',
            title: 'Abrir Todas as Views Disponíveis',
            icon: 'tab',
            hint: 'Ação',
            action: () => {
                availableViews.forEach((v) => {
                    if (!openViewIds.includes(v.id)) openViewIds.push(v.id);
                });
                renderMain();
                renderAside();
            }
        },
        {
            id: 'cmd-close-all',
            type: 'command',
            title: 'Fechar Todas as Views (Mostrar Estado Vazio)',
            icon: 'layers_clear',
            hint: 'Ação',
            action: () => {
                openViewIds = [];
                focusedViewId = null;
                renderMain();
                renderAside();
            }
        },
        {
            id: 'cmd-reset-aside',
            type: 'command',
            title: 'Redefinir Largura do Menu Lateral (Aside)',
            icon: 'vertical_split',
            hint: 'Aparência',
            action: () => {
                document.body.style.removeProperty('--aside-width');
            }
        }
    ];

    function openSearchDropdown() {
        if (!searchDropdown) return;
        searchDropdown.style.display = 'block';
        updateSearchResults();
    }

    function closeSearchDropdown() {
        if (!searchDropdown) return;
        searchDropdown.style.display = 'none';
        selectedIndex = 0;
    }

    function updateSearchResults() {
        if (!searchResults || !smartSearchInput) return;
        const rawInput = smartSearchInput.value;
        const normInput = normalizeStr(rawInput).trim();

        let filteredItems = [];

        // Detecção de busca por apólice: "apolice: ...", "apolice ...", "apólice ...", ou apenas "apolice"
        const isPolicyPrefixed = normInput.startsWith('apolice:') || normInput.startsWith('apolice ') || normInput === 'apolice';
        const isCommandOnly = !isPolicyPrefixed && normInput.startsWith('>');
        const isViewOnly = !isPolicyPrefixed && normInput.startsWith('#');

        let cleanQuery = normInput;
        if (isPolicyPrefixed) {
            cleanQuery = normInput.replace(/^apolice:?\s*/, '').trim();
        } else if (isCommandOnly) {
            cleanQuery = normInput.replace(/^>\s*/, '').trim();
        } else if (isViewOnly) {
            cleanQuery = normInput.replace(/^#\s*/, '').trim();
        }

        const queryTokens = extractSearchTokens(cleanQuery);

        // 1. Apólices & Pessoas (Segurados)
        if (!isCommandOnly && !isViewOnly) {
            INITIAL_POLICIES.forEach((p) => {
                const match = queryTokens.length === 0
                    ? (isPolicyPrefixed || !cleanQuery)
                    : matchPolicyTokens(p, queryTokens);

                if (match) {
                    filteredItems.push({
                        id: `pol-result-${p.id}`,
                        type: 'policy',
                        policyData: p,
                        title: `Apólice ${p.apolice} • ${p.cliente}`,
                        subtitle: `${p.tipoSeguro} • ${p.seguradora}`,
                        icon: 'badge',
                        hint: `${p.seguradora} • ${p.valor}`,
                        getTabCompletion: (currentInput) => {
                            const normCur = normalizeStr(currentInput);
                            const hasPref = normCur.startsWith('apolice:') || normCur.startsWith('apolice ');
                            const pref = hasPref ? 'apolice: ' : '';
                            const cleanCur = normCur.replace(/^apolice:?\s*/, '').trim();
                            const normSeg = normalizeStr(p.seguradora);

                            // Se o usuário digitou parte da seguradora
                            if (cleanCur && normSeg.startsWith(cleanCur) && cleanCur.length < normSeg.length) {
                                return `${pref}${p.seguradora} `;
                            }
                            // Se já contém a seguradora
                            if (cleanCur && cleanCur.includes(normSeg)) {
                                return `${pref}${p.seguradora} ${p.cliente}`;
                            }
                            return `${pref}${p.cliente} ${p.seguradora}`;
                        },
                        action: () => {
                            openCadastroView(p);
                        }
                    });
                }
            });
        }

        // 2. Views do Workspace
        if (!isCommandOnly) {
            const matchedViews = availableViews
                .filter((v) => {
                    if (queryTokens.length === 0) return isPolicyPrefixed || isViewOnly;
                    const viewHaystack = normalizeStr(`${v.title} ${v.id} ${v.mode || ''}`);
                    return queryTokens.every((tok) => viewHaystack.includes(tok));
                })
                .map((v) => {
                    const isOpen = openViewIds.includes(v.id);
                    let icon = 'article';
                    if (v.type === 'kanban') {
                        if (v.mode === 'gallery') icon = 'grid_view';
                        else if (v.mode === 'table') icon = 'table_rows';
                        else if (v.mode === 'list-detail') icon = 'view_sidebar';
                        else icon = 'view_kanban';
                    } else if (v.type === 'cadastro') {
                        icon = 'badge';
                    }
                    return {
                        id: v.id,
                        type: 'view',
                        title: `View: ${v.title}`,
                        subtitle: `Modo ${v.mode || v.type} • ${isOpen ? 'Aberta no workspace' : 'Disponível'}`,
                        icon,
                        hint: isOpen ? 'Em foco (Enter)' : 'Abrir view',
                        getTabCompletion: () => `# ${v.title}`,
                        action: () => {
                            if (!isOpen) {
                                openView(v.id);
                            } else {
                                focusView(v.id);
                            }
                        }
                    };
                });

            filteredItems.push(...matchedViews);
        }

        // 3. Comandos globais
        if (!isPolicyPrefixed && !isViewOnly) {
            const matchedCommands = commandList
                .filter((cmd) => {
                    if (queryTokens.length === 0) return true;
                    const cmdHaystack = normalizeStr(`${cmd.title} ${cmd.hint || ''}`);
                    return queryTokens.every((tok) => cmdHaystack.includes(tok));
                })
                .map((cmd) => ({
                    ...cmd,
                    subtitle: cmd.hint || 'Comando global',
                    getTabCompletion: () => `> ${cmd.title}`
                }));

            filteredItems.push(...matchedCommands);
        }

        currentResults = filteredItems;
        if (selectedIndex >= currentResults.length) {
            selectedIndex = 0;
        }

        renderSearchResults(cleanQuery);
    }

    function renderSearchResults(query) {
        if (!searchResults) return;
        searchResults.innerHTML = '';

        if (currentResults.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    Nenhum resultado encontrado para "<strong>${escapeHtml(query || smartSearchInput?.value || '')}</strong>"
                </div>
            `;
            return;
        }

        const policies = currentResults.filter((r) => r.type === 'policy');
        const views = currentResults.filter((r) => r.type === 'view');
        const commands = currentResults.filter((r) => r.type === 'command');

        const renderItem = (item, globalIndex) => {
            const el = document.createElement('div');
            el.className = `search-item ${globalIndex === selectedIndex ? 'is-selected' : ''}`;
            el.dataset.index = globalIndex;

            const highlightedTitle = highlightAccentInsensitive(item.title, query);
            const highlightedSub = item.subtitle ? highlightAccentInsensitive(item.subtitle, query) : '';

            el.innerHTML = `
                <div class="search-item-icon"><span class="material-symbols-rounded">${item.icon}</span></div>
                <div class="search-item-info">
                    <div class="search-item-title">${highlightedTitle}</div>
                    ${item.subtitle ? `<div class="search-item-sub">${highlightedSub}</div>` : ''}
                </div>
                <span class="search-item-hint">${escapeHtml(item.hint)}</span>
                <span class="search-item-tab-hint" title="Pressione Tab para autocompletar"><kbd>Tab</kbd></span>
            `;

            el.addEventListener('click', () => {
                executeItem(globalIndex);
            });

            el.addEventListener('mouseenter', () => {
                selectedIndex = globalIndex;
                updateSelectedVisual();
            });

            return el;
        };

        let currentIndex = 0;

        if (policies.length > 0) {
            const cat = document.createElement('div');
            cat.className = 'search-category-title';
            cat.textContent = `Apólices & Segurados (${policies.length})`;
            searchResults.appendChild(cat);
            policies.forEach((p) => searchResults.appendChild(renderItem(p, currentIndex++)));
        }

        if (views.length > 0) {
            const cat = document.createElement('div');
            cat.className = 'search-category-title';
            cat.textContent = `Views do Workspace (${views.length})`;
            searchResults.appendChild(cat);
            views.forEach((v) => searchResults.appendChild(renderItem(v, currentIndex++)));
        }

        if (commands.length > 0) {
            const cat = document.createElement('div');
            cat.className = 'search-category-title';
            cat.textContent = `Ações e Comandos (${commands.length})`;
            searchResults.appendChild(cat);
            commands.forEach((cmd) => searchResults.appendChild(renderItem(cmd, currentIndex++)));
        }

        scrollToSelected();
    }

    function updateSelectedVisual() {
        const items = searchResults.querySelectorAll('.search-item');
        items.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add('is-selected');
            } else {
                item.classList.remove('is-selected');
            }
        });
    }

    function scrollToSelected() {
        const selected = searchResults.querySelector('.search-item.is-selected');
        if (selected) {
            selected.scrollIntoView({ block: 'nearest' });
        }
    }

    function executeItem(index) {
        const item = currentResults[index];
        if (item && item.action) {
            item.action();
            closeSearchDropdown();
            if (smartSearchInput) {
                smartSearchInput.value = '';
                smartSearchInput.blur();
            }
        }
    }

    function handleTabCompletion(isShift = false) {
        if (!smartSearchInput) return;
        const raw = smartSearchInput.value;
        const norm = normalizeStr(raw).trim();

        // 1. Preenchimento rápido de prefixos
        if (!norm || /^ap(o(l(i(c(e)?)?)?)?)?$/i.test(norm)) {
            smartSearchInput.value = 'apolice: ';
            smartSearchInput.setSelectionRange('apolice: '.length, 'apolice: '.length);
            updateSearchResults();
            return;
        }

        if (norm === '>') {
            smartSearchInput.value = '> ';
            smartSearchInput.setSelectionRange(2, 2);
            updateSearchResults();
            return;
        }

        if (norm === '#') {
            smartSearchInput.value = '# ';
            smartSearchInput.setSelectionRange(2, 2);
            updateSearchResults();
            return;
        }

        // 2. Preenchimento baseado no resultado selecionado no dropdown
        if (currentResults.length === 0) return;

        const curItem = currentResults[selectedIndex];
        if (!curItem) return;

        const targetText = curItem.getTabCompletion ? curItem.getTabCompletion(raw) : curItem.title;
        const currentClean = normalizeStr(raw).trim();
        const targetClean = normalizeStr(targetText).trim();

        if (currentClean === targetClean) {
            // Já preenchido com o item atual: cicla para o próximo / anterior
            const nextIdx = isShift
                ? (selectedIndex - 1 + currentResults.length) % currentResults.length
                : (selectedIndex + 1) % currentResults.length;
            selectedIndex = nextIdx;
            updateSelectedVisual();
            scrollToSelected();
            const nextItem = currentResults[selectedIndex];
            if (nextItem && nextItem.getTabCompletion) {
                const nextText = nextItem.getTabCompletion(raw);
                smartSearchInput.value = nextText;
                smartSearchInput.setSelectionRange(nextText.length, nextText.length);
                updateSearchResults();
            }
        } else {
            smartSearchInput.value = targetText;
            smartSearchInput.setSelectionRange(targetText.length, targetText.length);
            updateSearchResults();
        }
    }

    if (smartSearchInput) {
        smartSearchInput.addEventListener('focus', () => {
            openSearchDropdown();
        });

        smartSearchInput.addEventListener('input', () => {
            openSearchDropdown();
        });

        smartSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                handleTabCompletion(e.shiftKey);
                return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = (selectedIndex + 1) % currentResults.length;
                    updateSelectedVisual();
                    scrollToSelected();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
                    updateSelectedVisual();
                    scrollToSelected();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    executeItem(selectedIndex);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeSearchDropdown();
                smartSearchInput.blur();
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (!smartSearchBar?.contains(e.target) && !searchDropdown?.contains(e.target)) {
            closeSearchDropdown();
        }
        if (addViewMenu && !btnAddSection?.contains(e.target) && !addViewMenu.contains(e.target)) {
            addViewMenu.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        // Atalhos com ALT para manter o usuário com a mão no teclado
        if (e.altKey && !e.ctrlKey && !e.metaKey) {
            // Mover view em foco para a esquerda / cima
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                moveFocusedView(-1);
                return;
            }
            // Mover view em foco para a direita / baixo
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                moveFocusedView(1);
                return;
            }
            // Alternar foco entre views abertas (ciclo anterior / próximo)
            if (e.key === '[' || e.key === 'PageUp') {
                e.preventDefault();
                cycleFocusedView(-1);
                return;
            }
            if (e.key === ']' || e.key === 'PageDown') {
                e.preventDefault();
                cycleFocusedView(1);
                return;
            }
            // Focar view diretamente por índice (Alt + 1..9)
            if (e.key >= '1' && e.key <= '9') {
                const targetIdx = parseInt(e.key, 10) - 1;
                if (targetIdx >= 0 && targetIdx < openViewIds.length) {
                    e.preventDefault();
                    focusView(openViewIds[targetIdx]);
                    return;
                }
            }
            // Fechar view atual em foco (Alt + W)
            if (e.key.toLowerCase() === 'w') {
                if (focusedViewId) {
                    e.preventDefault();
                    closeView(focusedViewId);
                    return;
                }
            }
            // Alternar layout empilhado / lado a lado (Alt + L)
            if (e.key.toLowerCase() === 'l') {
                e.preventDefault();
                toggleLayout();
                return;
            }
        }

        // Atalho da Omnibar (Ctrl + K / Ctrl + P)
        if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'p')) {
            e.preventDefault();
            if (smartSearchInput) {
                smartSearchInput.focus();
                smartSearchInput.select();
                openSearchDropdown();
            }
        }
    });

    // ========================================================
    // 16. CONTROLE DO GESTO (SWIPE ENTRE AS VIEWS NO MOBILE)
    // ========================================================
    let startX = 0;
    let startScroll = 0;

    if (main) {
        main.addEventListener(
            'touchstart',
            (event) => {
                if (window.innerWidth > 768) return;
                if (event.target.closest('.kanban-board') || event.target.closest('.table-container')) return;
                startX = event.touches[0].clientX;
                startScroll = main.scrollLeft;
            },
            { passive: true }
        );

        main.addEventListener(
            'touchend',
            (event) => {
                if (window.innerWidth > 768) return;
                if (event.target.closest('.kanban-board') || event.target.closest('.table-container')) return;

                const endX = event.changedTouches[0].clientX;
                const distance = endX - startX;

                if (Math.abs(distance) < 30) return;

                const views = main.querySelectorAll('.main-section');
                if (views.length === 0) return;

                const viewWidth = views[0].offsetWidth;
                const gap = 8;
                const currentIndex = Math.round(
                    (startScroll + 16) / (viewWidth + gap)
                );

                let nextIndex = currentIndex;

                if (distance < 0) {
                    nextIndex = Math.min(currentIndex + 1, views.length - 1);
                } else {
                    nextIndex = Math.max(currentIndex - 1, 0);
                }

                main.scrollTo({
                    left: views[nextIndex].offsetLeft - 16,
                    behavior: 'smooth'
                });
            },
            { passive: true }
        );
    }

    // Inicialização da interface
    renderAside();
    renderMain();
});
