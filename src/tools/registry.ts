import type { SvgIconComponent } from '@mui/icons-material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export interface ToolDefinition {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: SvgIconComponent;
  route: string;
  badge?: 'new' | 'beta';
  inputHint: string;
}

export const TOOLS: ToolDefinition[] = [
  {
    id: 'cv-reviewer',
    name: 'ATS CV Optimizer',
    tagline: 'Beat the bots',
    description:
      'Analyze your CV against ATS systems, uncover missing keywords, and land more interviews.',
    icon: DescriptionOutlinedIcon,
    route: '/cv-reviewer',
    inputHint: 'Upload PDF or DOCX',
  },
  {
    id: 'hr-scanner',
    name: 'HR CV Scanner',
    tagline: 'See it through their eyes',
    description:
      'Get an honest HR perspective on your CV plus a job description match score.',
    icon: ManageSearchIcon,
    route: '/hr-scanner',
    badge: 'new',
    inputHint: 'Upload CV + paste job description',
  },
  {
    id: 'linkedin-optimizer',
    name: 'LinkedIn Optimizer',
    tagline: 'Stand out in the feed',
    description:
      'Rewrite your headline, strengthen your about section, and close keyword gaps.',
    icon: LinkedInIcon,
    route: '/linkedin',
    badge: 'new',
    inputHint: 'Paste your LinkedIn sections',
  },
];
