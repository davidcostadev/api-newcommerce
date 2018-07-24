import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Projects } from '../../src/models';
import Controller from '../../src/controllers/Projects';
import truncate from '../truncate';
import projectsFacture from '../factures/Projects';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';
import { fields as projectFields } from '../../src/services/ProjectService';
import { clearData } from '../../src/utils/database/model';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Projects Controller should', () => {
  let project;

  beforeAll(async () => {
    await truncate();

    project = await projectsFacture();

    project = await Projects.findById(project.id);
  });

  beforeEach(async () => {
    const status = jest.fn();

    reqMock = {
      query: {},
      params: {},
      body: {},
    };
    resMock = {
      status,
      send: jest.fn(),
      json: jest.fn(),
    };

    status.mockReturnValue(resMock);
  });

  afterAll(() => {
    sequelize.close();
  });

  it('list projects', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data).toEqual(clearData([project], projectFields));
    expect(response.pagination).toEqual({
      currentPage: 1,
      nextPage: null,
      perPage: 30,
      previousPage: null,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('create project', async () => {
    const body = {
      name: 'New Project',
      enabled: true,
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);

    let projectCreated = resMock.json.mock.calls[0][0];
    projectCreated = projectCreated.toJSON();

    expect(body.name).toEqual(projectCreated.name);
    expect(body.enabled).toEqual(projectCreated.enabled);
  });

  it('get project', async () => {
    reqMock.params.id = project.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual(project);
  });

  it('get project not find project', async () => {
    reqMock.params.id = 99999999;

    await Controller.get(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(404);
    expect(resMock.send.mock.calls[0][0]).toEqual(EXCEPTION_NOT_FOUND);
  });

  it('update project', async () => {
    reqMock.params.id = project.id;
    const body = {
      name: 'Project Test',
      enabled: false,
    };
    reqMock.body = body;

    await Controller.update(reqMock, resMock);

    project = await Projects.findById(project.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('name');
    expect(response.toJSON()).toHaveProperty('enabled');
    expect(response.name).toEqual(body.name);
    expect(response.enabled).toEqual(body.enabled);
    expect(response.toJSON().initalValue).toEqual(body.initalValue);
    expect(response.type).toEqual(body.type);
  });

  it('delete project', async () => {
    reqMock.params.id = project.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(204);
  });
});
