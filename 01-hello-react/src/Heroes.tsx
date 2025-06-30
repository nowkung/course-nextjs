import React from 'react';


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

const heroes = [
  {
    "name": "Thor",
    "power": 5000,
    "powerName": "Lightning"
  },
  {
    "name": "IronMan",
    "power": 300,
    "powerName": "Arc reactor"
  },
  {
    "name": "DoctorStrange",
    "power": 4500,
    "powerName": "Magic"
  }
]

type HeroesProps = {
}

type HeroState = {
    heroes: HeroProps[];
}

export class Heroes extends React.Component<HeroesProps, HeroState> {

    constructor(props: HeroProps) {
        super(props);
        // Initialize state if needed
        this.state = {
            heroes: heroes
        };
    }


  render() {
    return (
        <>
            <h1>Heroes List</h1>
            {
                this.state.heroes.map((hero, index) =>(
                    <Hero key={index} name={hero.name} power={hero.power} powerName={hero.powerName} />
                  ))
            }

        </>
        );
  }
}
