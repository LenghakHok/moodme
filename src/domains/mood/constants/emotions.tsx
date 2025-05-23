import { ExcitedIcon } from "@/domains/mood/components/icons/exicited";
import { HappyIcon } from "@/domains/mood/components/icons/happy";
import { NeutralIcon } from "@/domains/mood/components/icons/nuetral";
import { SadIcon } from "@/domains/mood/components/icons/sad";
import { UpsetIcon } from "@/domains/mood/components/icons/upset";

export const emotions = [
  {
    label: "upset",
    icon: UpsetIcon,
  },
  {
    label: "sad",
    icon: SadIcon,
  },
  {
    label: "neutral",
    icon: NeutralIcon,
  },
  {
    label: "happy",
    icon: HappyIcon,
  },
  {
    label: "excited",
    icon: ExcitedIcon,
  },
];
export const emotionsEnum = {
  upset: {
    label: "upset",
    icon: <UpsetIcon />,
  },
  sad: {
    label: "sad",
    icon: <SadIcon />,
  },
  neutral: {
    label: "neutral",
    icon: (
      <NeutralIcon className="[&_path]:first:fill-amber-200 [&_path]:last:fill-amber-500" />
    ),
  },
  happy: {
    label: "happy",
    icon: <HappyIcon />,
  },
  excited: {
    label: "excited",
    icon: <ExcitedIcon />,
  },
};
