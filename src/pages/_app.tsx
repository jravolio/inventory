import type { AppProps } from 'next/app'
import { createServer, Model } from 'miragejs'
import '../styles/global.scss'
import { ProjectsProvider } from '../ProjectsContext'

// createServer({

//   models: {
//     account: Model,
//   },

//   seeds(server){
//     server.db.loadData({
//       accounts:[
//         {
//           id: 1,
//           account: 'account no db',
//           company: 'company no db',
//           type: 'type do db',
//         }
//       ],
//     })
//   },

//   routes(){
//     this.namespace = 'api'

//     this.get('/inventory', () =>{
//       return [
//         { id: 1, col1: 'Leitura Barramento - SAPO', col2: 'RPA Uipath', col3: 'Jenkins', col4:'Orquestrador do fluxo automático', col5:'Leitura de medidas de barramentos para validação de correção de falhas' },
//         { id: 2, col1: 'Leitura Barramento - SAPO', col2: 'RPA Uipath', col3: 'Jenkins', col4:'Orquestrador do fluxo automático', col5:'Leitura de medidas de barramentos para validação de correção de falhas' },
//         { id: 3, col1: 'Leitura Barramento - SAPO', col2: 'RPA Uipath', col3: 'Jenkins', col4:'Orquestrador do fluxo automático', col5:'Leitura de medidas de barramentos para validação de correção de falhas' },
//       ]
//     })
//     this.get('/projects', () =>{
//       return [
//         { id: 1, col1: 'Leitura Barramento - SAPO', col2: 'sdkpw01', col3: 'Banco de dados', col4:'PRD', col5:'Vtal' },
//         { id: 2, col1: 'Leitura Barramento - SAPO', col2: 'sdkpw01', col3: 'Banco de dados', col4:'PRD', col5:'Vtal' },
//         { id: 3, col1: 'Leitura Barramento - SAPO', col2: 'sdkpw01', col3: 'Banco de dados', col4:'PRD', col5:'Vtal' },
//       ]
//     })
//     this.get('/accounts', () =>{
//       return this.schema.all('account')
//     })
//     this.post('/accounts', (schema, request) =>{
//       const data = JSON.parse(request.requestBody)

//       return schema.create('account', data)
//     })
//   }
// })


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProjectsProvider apiUrl='/inventario/all'>
      <Component {...pageProps} />
    </ProjectsProvider>
    )
}

export default MyApp
