/*		
<Button 
  name="Button" 
  font.bold="false" 
  font.italic="false" 
  font.size="16" 
  width="250" 
  height="70" 
  touchEnabled="true" 
  visible="true" 
  alpha="1" 
  backgroundColor="#00A1F1" 
  borderColor="rgba(0,0,0,1)" 
  borderWidth="0" 
  textColor="#FFFFFF" 
  text="Button" 
  textAlignment="Alignment.MIDCENTER"
	positionType="FlexLayout.PositionType.RELATIVE" 
	alignSelf="FlexLayout.AlignSelf.AUTO" 
/>
*/

module.exports = {
  Components: {
    Button: {
      Sizes: {
        Default: ".button",
        Small: ".button-small",
        Medium: ".button-medium",
        Large: ".button-large",
      },
      Highlights: {
        Warning: ".button-warning",
        Danger: ".button-danger",
        Error: ".button-error",
        Success: ".button-success",
      }
    },
  }
};
