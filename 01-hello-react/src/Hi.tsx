import React from 'react';

type Props = {
  name: string;
  age: number;
  duration?: number; // Optional prop
}

// export const Hi = ({ name, age, duration }: Props) => {
//   return (
//     <>
//       <label>Name:</label>
//       <h1>Hello {name}</h1>

//       <label>Age:</label>
//       <h1>{age}</h1>
//     </>
//   );
// }

export class Hi extends React.Component<Props> {
  render() {
    const { name, age, duration } = this.props;

    return (
      <>
        <label>Name:</label>
        <h1>Hello {name}</h1>

        <label>Age:</label>
        <h1>{age}</h1>

        {duration && <p>Duration: {duration} ms</p>}
      </>
    );
  }
}
