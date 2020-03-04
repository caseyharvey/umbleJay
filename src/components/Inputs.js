import React from 'react';
import { useForm } from 'react-hook-form';

const Inputs = props => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ userInput, style }) => {
    props.onSubmit(userInput, style);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        name='userInput'
        spellCheck='false'
        autoComplete='off'
        autoCorrect='off'
        className='userInput'
        placeholder='>> enter text here'
        onFocus={e => e.target.select()}
        ref={register({
          required: true,
          maxLength: 300,
          pattern: /^[a-zA-Z\s'.,?!:;"-_]*$/
        })}
      />
      {errors.userInput && errors.userInput.type === 'required' && (
        <span className='inputError'>this field is required</span>
      )}
      {errors.userInput && errors.userInput.type === 'pattern' && (
        <span className='inputError'>no numbers or symbols allowed</span>
      )}
      {errors.userInput && errors.userInput.type === 'maxLength' && (
        <span className='inputError'>no more than 300 character long</span>
      )}
      <span className='selectStyle'>select your style</span>
      <div className='radioContainer'>
        <input
          type='radio'
          name='style'
          id='ay'
          value='ay'
          ref={register({ required: true })}
        />
        <label htmlFor='ay'>ay</label>
        <input
          type='radio'
          name='style'
          id='ish'
          value='ish'
          ref={register({ required: true })}
        />
        <label htmlFor='ish'>ish</label>
        <input
          type='radio'
          name='style'
          id='osh'
          value='osh'
          ref={register({ required: true })}
        />
        <label htmlFor='osh'>osh</label>
        <input
          type='radio'
          name='style'
          id='random'
          value='random'
          ref={register({ required: true })}
        />
        <label htmlFor='random'>random</label>
      </div>
      {errors.style && errors.style.type === 'required' && (
        <span className='inputError'>select your style</span>
      )}
      <input className='submitButton' type='submit' value='umbleJay' />
    </form>
  );
};

export default Inputs;
