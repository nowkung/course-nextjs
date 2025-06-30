import React, { useState, useEffect, use } from 'react';


type HeroProps = {
  name: string;
  power: number;
  powerName: string;
}

const Hero = ({ name, power, powerName }: HeroProps) => {
  return (
    <>
      <h1>Hero Name: {name}</h1>
      <h2>Hero Power: {power}</h2>
      <h3>Hero Power Name: {powerName}</h3>
    </>
  )
}

type HeroState = {
    heroes: HeroProps[];
    isLoading: boolean;
}

export const Heroes = () => {
  const [heroes, setHeroes] = useState<HeroProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:2727/heroes')
        .then(response => response.json())
        .then(data => {
          setHeroes(data);
        })
        .catch(error => {
          console.error('Error fetching heroes:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

        console.log('Heroes Once: ');
  }, []);

  useEffect(() => {
    console.log('Heroes updated:xxxx' );
  })

  return (
    <>
      {
        isLoading ? <p>Loading heroes...</p> :
        <div className="heroes-list">
          <h1>Heroes List</h1>
          {
            heroes.map((hero, index) => (
              <Hero key={index} name={hero.name} power={hero.power} powerName={hero.powerName} />
            ))
          }
        </div>


      }

       <button onClick={() => {
          const newHero: HeroProps = {
            name: 'New Hero',
            power: 100,
            powerName: 'Super Strength'
          };
          setHeroes([...heroes, newHero]);
        }}>
          Add Hero
        </button>
    </>
  );
}

export class Heroesx extends React.Component<{}, HeroState> {

    constructor(props: {}) {
        super(props);
        // Initialize state if needed
        this.state = {
            heroes: [],
            isLoading: true
        };
    }

    componentDidMount(): void {
      fetch('http://localhost:2727/heroes')
        .then(response => response.json())
        .then(data => {
          this.setState({ heroes: data });
        })
        .catch(error => {
          console.error('Error fetching heroes:', error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }

  render() {
    return (
        <>
          {
          this.state.isLoading ? <p>Loading heroes...</p> :

          <div className="heroes-list">
            <h1>Heroes List</h1>
            {
                this.state.heroes.map((hero, index) =>(
                    <Hero key={index} name={hero.name} power={hero.power} powerName={hero.powerName} />
                  ))
            }
          </div>
          }
        </>
        );
  }
}
