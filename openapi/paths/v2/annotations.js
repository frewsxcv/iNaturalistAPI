const j2s = require( "joi-to-swagger" );
const AnnotationsController = require( "../../../lib/controllers/v2/annotations_controller" );
const annotationsCreateSchema = require( "../../schema/request/annotations_create" );

module.exports = sendWrapper => {
  async function POST( req, res ) {
    const results = await AnnotationsController.create( req );
    sendWrapper( req, res, null, results );
  }

  POST.apiDoc = {
    tags: ["Annotation"],
    summary: "Create an annotation",
    security: [{
      userJwtRequired: []
    }],
    requestBody: {
      content: {
        "application/json": {
          schema: j2s( annotationsCreateSchema ).swagger
        }
      }
    },
    responses: {
      200: {
        description: "The annotation just created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResultsAnnotations"
            }
          }
        }
      }
    }
  };

  return {
    POST
  };
};
