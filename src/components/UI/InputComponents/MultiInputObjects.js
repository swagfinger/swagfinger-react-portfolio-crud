import React, { Component } from 'react';
import classes from './MultiInputObjects.module.scss';
import InputContext from '../../../context/InputContext';
import Icon from '../InputComponents/Icon';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Input from '../../UI/InputComponents/Input';
import AccordionWithRemove from '../../UI/InputComponents/AccordionWithRemove';
import FlexColumn from '../../../hoc/Layout/FlexColumn';
import FlexRow from '../../../hoc/Layout/FlexRow';

class MultiInputObjects extends Component {
  static contextType = InputContext;

  constructor(props) {
    super(props);

    this.inputClasses = [classes.InputElement];
  }
  render() {
    const { addinput, removeinput, changed } = this.context;
    const { value, componentconfig, field, validation } = this.props;
    const deleteButton = (
      <Button
        title='Delete'
        type='WithBorder'
        className={classes.RemoveButton}
        onClick={(event) => {
          event.preventDefault();
          removeinput(field);
        }}>
        <Icon iconstyle='far' code='trash-alt' size='sm' />
      </Button>
    );

    const row = value.map((val, index) => {
      let tempClasses = [...this.inputClasses];
      console.log('is Obj:', val);
      // if (
      //   componentconfig.metadata[i].validation.isRequired &&
      //   !value.valid &&
      //   (value.touched || (!value.touched && !value.pristine))
      // ) {
      //   tempClasses.push(classes.Invalid);
      // }

      return Object.keys(val.data).map((each, i) => {
        console.log('val.data[each]: ', val.data[each]);
        return (
          <FlexRow
            flexGrow
            spacing='bottom-notlast'
            key={field + index + '_' + i}>
            <FlexColumn flexGrow spacing='bottom'>
              <label className={classes.Label}>{each}</label>
              <Input
                className={classes.tempClasses}
                {...componentconfig}
                // validation={validation}
                value={{ data: val.data[each] }}
                onChange={(event) =>
                  //pass in the name of the prop, and the index (if array item)
                  changed(event.target.value, field, index)
                }
              />
            </FlexColumn>
          </FlexRow>
        );
      });
    });

    console.log('ROW:', row);

    return (
      <div className={classes.MultiInputObjects}>
        <React.Fragment>
          <AccordionWithRemove
            {...{
              allowMultiOpen: false,
              openOnStartIndex: -1, //zero-index, negative value or invalid index to not open on start,
              field,
              onClick: () => {},
            }}
            removeButton={deleteButton}>
            {row}
          </AccordionWithRemove>
        </React.Fragment>

        <Button
          title='Add'
          type='WithBorder'
          onClick={(event) => addinput(event, field)}>
          <Icon iconstyle='fas' code='plus' size='sm' />
          <p>Add</p>
        </Button>
      </div>
    );
  }
}

MultiInputObjects.propTypes = {
  className: PropTypes.string,
  value: PropTypes.array,
  validation: PropTypes.object,
  placeholder: PropTypes.string,
  componentconfig: PropTypes.object,
  field: PropTypes.string,
  changed: PropTypes.func,
};

export default MultiInputObjects;