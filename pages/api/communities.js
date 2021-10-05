import { SiteClient } from 'datocms-client';

export default async function requestsReceptor(request, response){
    if(request.method === 'POST'){
        const TOKEN = '7f587828a1c81df3bb409737dc7738';
        const client = new SiteClient(TOKEN);
    
        // Validar os dados, antes de sair cadastrando
        const record = await client.items.create({
            itemType: "1235416", //ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de teste",
            // imageUrl: "https://github.com/gabrieldasilvadev.png",
            // creatorSlug: "gabrieldasilvadev,"
        });
    
        console.log(TOKEN)
        response.json({
            dados: '7f587828a1c81df3bb409737dc7738',
            record: record,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda nao temos nada no GET, mas no POST tem!'
    })
}