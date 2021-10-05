import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/SocialCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar (props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.gitUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <a className="boxLink" href={`https://github.com/${props.gitUser}`}>
        @{props.gitUser}
      </a>
      <hr />

    <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle"> 
        {props.title} ({props.items.length})
      </h2>
      <ul>
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const gitUser = props.githubUser;
  const [community, setCommunity] = React.useState([]);
  console.log(community);
  const favoritePeople = [
    'marcobrunodev',
    'rafaballerini',
    'gabrieldasilvadev',
    'filipedeschamps',
    'JeCarlos7713',
    'rafaelmaiach',
  ];

  const [followers, setFollowers] = React.useState([])

  //  0 - Pegar o array de dados do GitHub
  React.useEffect(function () {
  fetch('https://api.github.com/users/gabrieldasilvadev/followers')
    .then(function(respostaDoServidor){
        return respostaDoServidor.json();
      
    })
    .then(function(respostaCompleta){
      setFollowers(respostaCompleta);
    })



    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '2ece5d2e0a405be7be2bd783595063',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response) => response.json())
    .then((respostaCompleta) =>{
      const communitiesDato = respostaCompleta.data.allCommunities;
      console.log(communitiesDato)

      setCommunity(communitiesDato);
    })

  }, [])


  // 1 - Criar um box que vai ter um map, baseado nos itens do array que pegamos do GitHub.

  

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar gitUser={gitUser}/>
      </div>

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">
            Welcome!
            <p className="welcomeUser">@{gitUser}</p>
          </h1>
          
          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subTitle">O que voce deseja fazer?"</h2>
          <form onSubmit={function hundleCreateCommunity(e) {
            e.preventDefault();
            const dataForm = new FormData(e.target);

            console.log(dataForm.get('title'));
            console.log(dataForm.get('image'));

            const myCommunity = {
              title: dataForm.get('title'),
              imageUrl: dataForm.get('image'),
              creatorSlug: gitUser,
            }

            fetch('/api/communities', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(myCommunity)
            })
            .then(async (response) => {
              const dates = await response.json()
              console.log(dates.record)
              const myCommunity = dates.record;
              const newCommunity = [...community, myCommunity]
              setCommunity(newCommunity)
            })
          }}>
            <div>
              <input placeholder="Qual vai ser o seu nome na comunidade?" 
              name="title" 
              aria-label="Qual vai ser o seu nome na comunidade?"
              type="text"
              />
            </div>
            <div>
              <input placeholder="Coloque uma URL para usarmos de capa" 
              name="image" 
              aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>

            <button>
              Create Community
            </button>
          </form>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>

        <ProfileRelationsBox title="Followers" items={followers}/>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">My Community ({community.length})</h2>
          <ul>
              {community.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/communities/${item.id}`}>
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          My Friends ({favoritePeople.length})
        </h2>

          <ul>
            {favoritePeople.map((item) => {
              return (
                <li key={item}>
                  <a 
                  href={`https://www.github.com/${item}`}>
                  <img src={`https://www.github.com/${item}.png`}/>
                  <span>{item}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resp) => resp.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 