import Button from '@mui/material/Button';

function CustomButton({ onClickFunction, buttonText, buttonColor, buttonType = 'button' }) {
  return (
    <Button
      type={buttonType}  
      variant="contained"
      style={{ backgroundColor: buttonColor || '#3f50b5', color: 'white' }}  
      onClick={onClickFunction}
    >
      {buttonText || "Default Text"}
    </Button>
  );
}

export default CustomButton;
