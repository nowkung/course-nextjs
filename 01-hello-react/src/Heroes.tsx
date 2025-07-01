import React, { useEffect, useState } from "react";

type HeroProps = {
  name: string;
  power: number;
  powerName: string;
};

const Hero = ({ name, power, powerName }: HeroProps) => {
  return (
    <>
      <h1>Hero Name: {name}</h1>
      <h2>Hero Power: {power}</h2>
      <h3>Hero Power Name: {powerName}</h3>
    </>
  );
};

type HeroesProps = {};

type HeroList = {
  heroes: HeroProps[];
  isLoading: boolean;
};

export class Heroes extends React.Component<HeroesProps, HeroList> {
  constructor(props: HeroProps) {
    super(props);
    // Initialize state if needed
    this.state = {
      heroes: [],
      isLoading: true,
    };
  }

  componentDidMount(): void {
    fetch("http://localhost:2727/heroes")
      .then((res) => {
        res.json().then((data) => {
          this.setState({ heroes: data });
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <>
        <h1>Heroes List</h1>
        {this.state.isLoading && <p>Loading...</p>}
        {!this.state.isLoading &&
          this.state.heroes.map((hero, index) => (
            <Hero
              key={index}
              name={hero.name}
              power={hero.power}
              powerName={hero.powerName}
            />
          ))}
      </>
    );
  }
}

export const HeroFunc = () => {
  const [heroes, setHeroes] = useState<HeroProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:2727/heroes")
      .then((res) => {
        res.json().then((data) => {
          setHeroes(data);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Heroes List</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          {heroes.map((hero, index) => {
            return (
              <div>
                <Hero
                  key={index}
                  name={hero.name}
                  power={hero.power}
                  powerName={hero.powerName}
                />
                <EditHeroButton
                  index={index}
                  heroName={hero.name}
                  heroPower={hero.power}
                  heroPowerName={hero.powerName}
                  heroes={heroes}
                  setHeroes={setHeroes}
                />
              </div>
            );
          })}
          <div
            style={{
              width: "100%",
              height: 2,
              backgroundColor: "red",
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <h1>Add New Hero</h1>
          <AddHeroButton heroes={heroes} setHeroes={setHeroes} />
        </>
      )}
    </>
  );
};

const AddHeroButton = (props: {
  heroes: HeroProps[];
  setHeroes: React.Dispatch<React.SetStateAction<HeroProps[]>>;
  heroName?: string;
  heroPower?: number;
  heroPowerName?: string;
}) => {
  const [name, setName] = useState(props.heroName || "");
  const [power, setPower] = useState(props.heroPower || 0);
  const [powerName, setPowerName] = useState(props.heroPowerName || "");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p>Name:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p>Power:</p>
        <input
          type="number"
          value={power}
          onChange={(e) => setPower(parseInt(e.target.value))}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p>Power Name:</p>
        <input
          type="text"
          value={powerName}
          onChange={(e) => setPowerName(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: "60%",
          justifyContent: "center",
        }}
      >
        <button
          style={{ width: 100 }}
          onClick={() => {
            props.heroes.push({ name, power, powerName });
            props.setHeroes([...props.heroes]);
            setName("");
            setPower(0);
            setPowerName("");
          }}
        >
          {"Add Hero"}
        </button>
      </div>
    </div>
  );
};

const SaveHeroButton = (props: {
  index: number;
  heroes: HeroProps[];
  setHeroes: React.Dispatch<React.SetStateAction<HeroProps[]>>;
  heroName?: string;
  heroPower?: number;
  heroPowerName?: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState(props.heroName || "");
  const [power, setPower] = useState(props.heroPower || 0);
  const [powerName, setPowerName] = useState(props.heroPowerName || "");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p>Name:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p>Power:</p>
        <input
          type="number"
          value={power}
          onChange={(e) => setPower(parseInt(e.target.value))}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p>Power Name:</p>
        <input
          type="text"
          value={powerName}
          onChange={(e) => setPowerName(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: "60%",
          justifyContent: "center",
        }}
      >
        <button
          style={{ width: 100 }}
          onClick={() => {
            props.heroes[props.index].name = name;
            props.heroes[props.index].power = power;
            props.heroes[props.index].powerName = powerName;
            props.setHeroes([...props.heroes]);
            setName("");
            setPower(0);
            setPowerName("");
            props.setEditing(false);
          }}
        >
          {"Save Hero"}
        </button>
      </div>
    </div>
  );
};

const EditHeroButton = (props: {
  heroes: HeroProps[];
  setHeroes: React.Dispatch<React.SetStateAction<HeroProps[]>>;
  heroName: string;
  heroPower: number;
  heroPowerName: string;
  index: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {!isEditing && (
        <button
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}
      {isEditing && (
        <SaveHeroButton
          index={props.heroes.findIndex((hero) => hero.name === props.heroName)}
          heroes={props.heroes}
          setHeroes={props.setHeroes}
          heroName={props.heroName}
          heroPower={props.heroPower}
          heroPowerName={props.heroPowerName}
          setEditing={setIsEditing}
        />
      )}
    </>
  );
};
