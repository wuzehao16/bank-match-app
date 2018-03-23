import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRadiochange = value => {
    console.log(value);
  };

  render() {
    return (
      <div>
        <RadioGroup horizontal onChange={this.onRadiochange}>
          <RadioButton value="Male">Male</RadioButton>
          <RadioButton value="Female">Female</RadioButton>
        </RadioGroup>
      </div>
    );
  }
}
