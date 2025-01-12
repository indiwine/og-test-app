import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { SpeedDialActionProps } from '@mui/material/SpeedDialAction/SpeedDialAction';


export interface BottomDialActionProps extends SpeedDialActionProps {
  name: string;
}

interface BottomDialProps {
  actions: BottomDialActionProps[];
}

export function BottomDial({actions}: BottomDialProps) {
  return (
    <Box sx={{height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{position: 'absolute', bottom: 16, right: 16}}
        icon={<SpeedDialIcon/>}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
