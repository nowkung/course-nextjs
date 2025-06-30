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

type State = {
  count: number;
};

export class Hi extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

  increaseCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    const { name, age, duration } = this.props;

    return (
      <>
        <label>Name:</label>
        <h1>Hello {name}</h1>

        <label>Age:</label>
        <h1>{age}</h1>

        {duration && <p>Duration: {duration} ms</p>}

        <label>Count:</label>
        <h1>{this.state.count}</h1>

        <button onClick={this.increaseCount}>Increase Count</button>
      </>
    );
  }
}
