import { Projects } from '../models';
import { projectForm } from '../definitions';
import createResourceService from '../utils/createResourceService';

export const fields = [
  'id',
  'name',
  'enabled',
];

const ProjectService = createResourceService(Projects, {
  definitions: projectForm,
  options: { fields },
});

export default ProjectService;
