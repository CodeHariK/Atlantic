import { Pattern } from '../data/regex';
import { TelTest } from '../data/regex_test';
import SpaceLayout from '../layouts/SpaceLayout';

export default function Test() {
   return (
      <SpaceLayout two title='Page Not Found'>
         <TelTest pattern={Pattern.Tel}></TelTest>

         {/* <PositionBox></PositionBox> */}
         {/* <PositionBox2></PositionBox2> */}
         {/* <PositionCheck></PositionCheck> */}

      </SpaceLayout>
   );
}