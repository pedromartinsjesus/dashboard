import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? window._env_.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

const client = new Lokka({
  transport: new Transport(apiUrl),
});

export default class Centaurus {
  static async getAllReleaseTag() {
    try {
      const releaseTag = await client.query(`
        {
          releaseTagList {
            edges {
              node {
                id
                releaseDisplayName
                tagId
              }
            }
          }
        }
      `);
      return releaseTag;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllFieldsTag(dataRelease) {
    try {
      let fieldsTag = [];
      if (dataRelease === '0') {
        fieldsTag = await client.query(`
        {
          fieldsList {
            edges {
              node {
                id
                displayName
                fieldId
              }
            }
          }
        }
      `);

        fieldsTag = {
          fieldsByTagId: fieldsTag.fieldsList.edges.map(field => ({
            id: field.node.id,
            displayName: field.node.displayName,
            fieldId: field.node.fieldId,
          })),
        };
      } else {
        fieldsTag = await client.query(`
          {
            fieldsByTagId(tagId: ${dataRelease}) {
              id
              displayName
              fieldId
            }
          }
        `);
      }
      return fieldsTag;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllPipelineStageList() {
    try {
      const pipelineStage = await client.query(`
        {
          pipelineStageList {
            edges {
              node {
                id
                displayName
                pipelineStageId
                level
              }
            }
          }
        }
      `);
      return pipelineStage;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllPipelinesByFieldIdAndStageId(tagId, dataField, dataStage) {
    try {
      const pipelinesStageId = await client.query(`
        {
          pipelinesByStageIdAndTagIdAndFieldId(
            ${tagId !== '0' ? 'tagId:' + tagId + ',' : ''}
            ${dataField !== '0' ? 'fieldId:' + dataField + ',' : ''}
            ${dataStage !== '0' ? 'stageId:' + dataStage : ''}) {
            edges {
              node {
                pipelineDisplayName
                pipelineId
                processCount
                lastProcessId
                lastProcessStartTime
                lastProcessEndTime
                lastProcessStatus
              }
            }
          }
        }
      `);

      return {
        pipelinesByFieldIdAndStageId: pipelinesStageId.pipelinesByStageIdAndTagIdAndFieldId.edges.map(
          pipeline => ({
            displayName: pipeline.node.pipelineDisplayName,
            pipelineId: pipeline.node.pipelineId,
            process: {
              processCount: pipeline.node.processCount,
              lastProcessId: pipeline.node.lastProcessId,
              startTime: pipeline.node.lastProcessStartTime,
              endTime: pipeline.node.lastProcessEndTime,
              status: pipeline.node.lastProcessStatus,
            },
          })
        ),
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllProcessesByFieldIdAndPipelineId(
    tagId,
    dataField,
    dataPipelineId
  ) {
    try {
      const pipelineProcesses = await client.query(`
        {
          processesByTagIdAndFieldIdAndPipelineId(
            ${tagId !== '0' ? 'tagId:' + tagId + ',' : ''}
            ${dataField !== '0' ? 'fieldId:' + dataField + ',' : ''}
            pipelineId: ${dataPipelineId}) {
            processId
            startTime
            endTime
            flagPublished
            publishedDate
            comments
            productLog
            savedProcesses {
              savedDate
              savedDateEnd
            }
            processStatus {
              name
            }
            session {
              user {
                displayName
              }
            }
            fields {
              edges {
                node {
                  id
                  displayName
                  releaseTag {
                    releaseDisplayName
                  }
                }
              }
            }
          }
        }
      `);
      return pipelineProcesses;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllProductsByProcessId(dataProcessId) {
    try {
      const productsProcess = await client.query(`
        {
          productsByProcessId(processId: ${dataProcessId}) {
            displayName
            dataType
            table {
              dachsUrl
            }
            Class {
              displayName
              productType {
                displayName
              }
            }
          }
        }
      `);
      return productsProcess;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllProcessComponentsByProcessId(dataProcessId) {
    try {
      const versionProcess = await client.query(`
        {
          processComponentsByProcessId(processId: ${dataProcessId}) {
            version
            module {
              displayName
              version
            }
          }
        }
      `);
      return versionProcess;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllCommentsByProcessId(dataProcessId) {
    try {
      const commentsProcess = await client.query(`
        {
          commentsByProcessId(processId: ${dataProcessId}) {
            comments
            date
            user {
              displayName
            }
          }
        }
      `);
      return commentsProcess;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllProcessByProcessId(dataProcessId) {
    try {
      const processByProcessId = await client.query(`
        {
          processByProcessId(processId: ${dataProcessId}) {
            name
            processId
            productLog
            comments
            inputs {
              edges {
                node {
                  process {
                    name
                    processId
                    productLog
                    comments
                    inputs {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `);
      return processByProcessId;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }
}
