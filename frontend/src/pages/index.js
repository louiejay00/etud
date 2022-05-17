import { Typography } from "@material-ui/core";

export default function IndexPage() {
  return (
    <>
      <Typography paragraph>
        E-tulod ride hailing application that is convinient for people who don't have go
        to the toda station or wait for other passengers. The study aims to modernize the way people call the tricycle.  
        E-Tulod will be a mobile application that will notify tricycle drivers within 
        Bayombong that there is a passenger available for pick up (after a passenger inputs the details in the app) 
        and they will have the option to pick up the passenger after the request is accepted 
        the passenger will be notified that there is a tricycle on the way.  
      </Typography>
      <Typography paragraph>
        This project is a different take on other ride hailing mobile applications because instead of
        using private vehicles or cars the mobile application utilizes tricycles which is very common
        for transportation in Bayombong. Also, the mobile application uses SMS text message 
        for notifications and transfer of information from passenger to Tricycle driver.  
      </Typography>
    </>
  );
}
