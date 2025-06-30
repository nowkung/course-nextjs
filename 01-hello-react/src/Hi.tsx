

type Props = {
  name: string;
  age: number;
  duration?: number; // Optional prop
}

export const Hi = ({ name, age, duration }: Props) => {
  return (
    <>
      <label>Name:</label>
      <h1>Hello {name}</h1>

      <label>Age:</label>
      <h1>{age}</h1>
    </>
  );
}
