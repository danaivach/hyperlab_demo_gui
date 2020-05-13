import React from 'react';


class Configuration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        robot2: true,
        robot1: true,
        robot3: true,
        manual2: true,
        manual3: true,
      };

      this.yggdrasilUrl = 'http://localhost:8080';
      this.ws = props.websocket;
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateRobot2(withManual) {
      var requestObj = new XMLHttpRequest();
      // get a callback when the server responds
      requestObj.addEventListener('load', () => {
          console.log("Received response from Yggdrasil:")
          console.log(requestObj.responseText)
        });
      const url = this.constructUrl('/artifacts/robot2');
      var payload = `@prefix eve: <http://w3id.org/eve#> .

      <http://localhost:8080/artifacts/robot2>
        a eve:Artifact ;
        eve:hasName "Robot2" ;
        eve:isRobot "Robot2" ;
        eve:hasCartagoArtifact "www.Robot2" .
      `;
      if (withManual) {
        payload = `@prefix eve: <http://w3id.org/eve#> .
        <http://localhost:8080/artifacts/robot2>
          a eve:Artifact ;
          eve:hasName "Robot2" ;
          eve:isRobot "Robot2" ;
          eve:hasCartagoArtifact "www.Robot2" ;
          eve:hasManual [ eve:hasName "driverManual" ;
          eve:hasUsageProtocol [
            eve:hasName "loadAndDrive" ;
            eve:hasFunction "drive(X1,Y1,X2,Y2)" ;
            eve:hasPrecondition "true" ;
            eve:hasBody " move(X1,Y1);
                    load;
                    move(X2,Y2);
                    unload "
          ]
          ].`;
      }
      requestObj.open('PUT', url);
      requestObj.setRequestHeader('content-type', 'text/turtle');
      requestObj.setRequestHeader('slug', 'robot2');
      requestObj.send(payload);
    }

    createRobot(requestObj, robotNumber) {
      const url = this.constructUrl('/artifacts');
      console.log('dispatching request to ' + url);
      var payload;
      if (robotNumber === 1) {
        payload = `@prefix eve: <http://w3id.org/eve#> .
        <http://localhost:8080/artifacts/robot1> 
            a eve:Artifact ;
            eve:hasName "Robot1" ;
            eve:isRobot "Robot1" ;
            eve:hasCartagoArtifact "www.Robot1" .`;
      } else if (robotNumber === 2) {
        payload = `@prefix eve: <http://w3id.org/eve#> .
        <http://localhost:8080/artifacts/robot2>
          a eve:Artifact ;
          eve:hasName "Robot2" ;
          eve:isRobot "Robot2" ;
          eve:hasCartagoArtifact "www.Robot2" ;
          eve:hasManual [ eve:hasName "driverManual" ;
          eve:hasUsageProtocol [
            eve:hasName "loadAndDrive" ;
            eve:hasFunction "drive(X1,Y1,X2,Y2)" ;
            eve:hasPrecondition "true" ;
            eve:hasBody " move(X1,Y1);
                    load;
                    move(X2,Y2);
                    unload "
          ]
          ].`;
      } else if (robotNumber === 3) {
            payload = `@prefix td: <http://www.w3.org/ns/td#> .
            @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
            @prefix iot: <http://iotschema.org/> .
            @prefix http: <http://iotschema.org/protocol/http> .
            @prefix eve: <http://w3id.org/eve#> .
            @prefix ex: <http://example.com/> .

<http://localhost:8080/artifacts/robot3>
  a td:Thing, eve:Artifact;
  td:name "Robot3"^^xsd:string ;
  td:interaction  [
    a td:Property, ex:User ; 
    td:name "user"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/user"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:form [
      http:methodName "POST"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/user"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "writeproperty"^^xsd:string
    ] ;
    td:form [
      http:methodName "DELETE"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/user"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string 
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken; td:schemaType td:String; td:const "\"opensesame\"" ]
      ] 
     ];
     td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "name"^^xsd:string ;
        td:schema [ a ex:UserName; td:schemaType td:String ]
      ] ;
      td:field [
        td:name "email"^^xsd:string ;
        td:schema [ a ex:Email; td:schemaType td:String ]
      ] 
     ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken; td:schemaType td:String; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0;
        td:maximum 1023
      ]
    ]
  ] ;
  td:interaction  [
    a td:Action, ex:RotateBase ; 
    td:name "rotateBase"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/base"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken; td:schemaType td:String; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Number ];
        td:minimum 0;
        td:maximum 1023
      ]
    ]
   ];
   td:interaction  [
    a td:Action, ex:RotateShoulder ;
    td:name "rotateShoulder"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/wrist/rotation"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken ; td:schemaType td:string; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 205 ;
        td:maximum 810
      ]
    ]
   ];
   td:interaction  [
    a td:Action, ex:RotateElbow ;
    td:name "rotateElbow"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/elbow"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken ; td:schemaType td:string; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 210 ;
        td:maximum 900 
      ]
    ]
   ];
   td:interaction  [
    a td:Action, ex:RotateXWrist ;
    td:name "rotateXWrist"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/wrist/angle"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken ; td:schemaType td:String; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Number ];
        td:minimum 200 ;
        td:maximum 830
      ]
    ]
   ];
   td:interaction  [
    a td:Action, ex:RotateYWrist ;
    td:name "rotateYWrist"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/wrist/rotation"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken ; td:schemaType td:string; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0 ;
        td:maximum 1023
      ]
    ]
   ];
   td:interaction  [
    a td:Action, ex:Grasp ;
    td:name "grasp"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/gripper"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken; td:schemaType td:String; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Number ];
        td:minimum 0;
        td:maximum 512
      ]
    ]
   ];
   td:interaction  [
    a td:Action, ex:ArrangePosture ;
    td:name "arrangePosture"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/posture"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken ; td:schemaType td:String; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "base"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0 ;
        td:maximum 1023
      ] ;
      td:field [
        td:name "shoulder"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 205 ;
        td:maximum 810
      ] ;
      td:field [
        td:name "elbow"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 210 ;
        td:maximum 900
      ] ;
      td:field [
        td:name "wristAngle"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 200 ;
        td:maximum 830
      ] ;
      td:field [
        td:name "wristRotation"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0;
        td:maximum 1023
      ] ;
       td:field [
        td:name "gripper"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0;
        td:maximum 512
      ] 
    ]
  ];
  td:interaction  [
    a td:Property, ex:BaseJoint ;
    td:name "baseJoint"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/base"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0 ;
        td:maximum 1023
      ]
    ]
   ];
   td:interaction  [
    a td:Property, ex:ShoulderJoint ;
    td:name "shoulderJoint"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/shoulder"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 205 ;
        td:maximum 810
      ]
    ]
   ];
   td:interaction  [
    a td:Property, ex:ElbowJoint ;
    td:name "elbowJoint"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/elbow"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 210 ;
        td:maximum 900
      ]
    ]
   ];
   td:interaction  [
    a td:Property, ex:WristAngleJoint ;
    td:name "wristAngleJoint"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/wrist/angle"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 200 ;
        td:maximum 830
      ]
    ]
   ];
   td:interaction  [
    a td:Property, ex:WristRotateJoint ;
    td:name "wristRotateJoint"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/wrist/rotation"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0 ;
        td:maximum 1023
      ]
    ]
   ];
   td:interaction  [
    a td:Property, ex:GripperJoint ;
    td:name "GripperJoint"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/gripper"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "value"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0 ;
        td:maximum 512
      ]
    ]
   ];
   td:interaction  [
    a td:Property, ex:Posture ;
    td:name "posture"^^xsd:string ;
    td:form [
      http:methodName "GET"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/posture"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "readproperty"^^xsd:string
    ] ;
    td:outputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken ; td:schemaType td:String; td:const "\"opensesame\"" ]
      ] ;
      td:field [
        td:name "base"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0 ;
        td:maximum 1023
      ] ;
      td:field [
        td:name "shoulder"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 205 ;
        td:maximum 810
      ] ;
      td:field [
        td:name "elbow"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 210 ;
        td:maximum 900
      ] ;
      td:field [
        td:name "wristAngle"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 200 ;
        td:maximum 830
      ] ;
      td:field [
        td:name "wristRotation"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0;
        td:maximum 1023
      ] ;
       td:field [
        td:name "gripper"^^xsd:string ;
        td:schema [ a ex:Value ; td:schemaType td:Integer ];
        td:minimum 0;
        td:maximum 512
      ] 
    ]
  ];
  td:interaction  [
    a td:Action, ex:Reset ;
    td:name "reset"^^xsd:string ;
    td:form [
      http:methodName "PUT"^^xsd:string ;
      td:href "https://api.interactions.ics.unisg.ch/leubot/reset"^^xsd:anyURI ;
      td:mediaType "application/json"^^xsd:string ;
      td:rel "invokeaction"^^xsd:string
    ] ;
    td:inputSchema [
      td:schemaType td:Object ;
      td:field [
        td:name "token"^^xsd:string ;
        td:schema [ a ex:UserToken ; td:schemaType td:String; td:const "\"opensesame\"" ]
      ]
    ]
   ].`;
      }
      requestObj.open('POST', url);
      requestObj.setRequestHeader('content-type', 'text/turtle');
      requestObj.setRequestHeader('slug', 'robot' + robotNumber);
      requestObj.send(payload);
    }

    removeRobot(requestObj, robotNumber) {
      requestObj.open('DELETE', this.constructUrl('/artifacts/robot' + robotNumber));
      requestObj.send();
    }

    updateWorkspace() {
      var request = new XMLHttpRequest();
      const url = this.constructUrl('/workspaces');
      var payload = `@prefix eve: <http://w3id.org/eve#> .
      <>
          a eve:Workspace;
          eve:hasName "interactionsWksp";`
      if (this.state.robot1) {
        payload +=  `
        eve:contains <http://localhost:8080/artifacts/robot1>;`;
      }
      if (this.state.robot2) {
        payload += `
        eve:contains <http://localhost:8080/artifacts/robot2>;`;
      }
      if (this.state.robot3) {
        payload += `
        eve:contains <http://localhost:8080/artifacts/robot3>;`;
      }
      if (this.state.manual3) {
        payload += `
        eve:contains <http://localhost:8080/manuals/phantomXmanual>`;
      }
      payload += '.';
      console.log("sending payload: " + payload);
      request.open('POST', url);
      request.setRequestHeader('content-type', 'text/turtle');
      request.setRequestHeader('slug', 'interactionsWksp');
      request.send(payload);
    }

    constructUrl(relativePath) {
        return this.yggdrasilUrl + relativePath;
    }

    changeManual(name_, active, updateRobot) {
      // send info to jacamo
      const jsonObj = {jacamo: {changeManual: {name: name_, enabled: active}}};
      this.ws.send(JSON.stringify(jsonObj));

      // send info to yggdrasil
      if (name_ === 'manual2') {
        this.setState({
          manual2: active
        });
        if (updateRobot) {
          this.updateRobot2(active);
        }
      } else if (name_ === 'manual3') {
        // manual3
        this.setState({
          manual3: active
        });
        var xhr = new XMLHttpRequest();
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            console.log("Received response from Yggdrasil:")
            console.log(xhr.responseText)
          });
        if (active) {
          const payload = `@prefix eve: <http://w3id.org/eve#> .

          <http://localhost:8080/manuals/phantomXmanual> a eve:Manual ;
              eve:hasName "phantomXmanual" ;
              eve:explains <http://localhost:8080/artifacts/robot3> ;
              eve:hasUsageProtocol [
                eve:hasName "deliver" ;
                eve:hasFunction "pickAndPlace(D1,D2)" ;
                eve:hasPrecondition "true" ;
                eve:hasBody " -+rotating(\\"Robot3\\",D1); -+grasping(\\"Robot3\\"); -+rotating(\\"Robot3\\",D2); -+releasing(\\"Robot3\\") "
              ] .`;
          xhr.open('POST', this.constructUrl('/manuals'));
          xhr.setRequestHeader('content-type', 'text/turtle');
          xhr.setRequestHeader('slug', 'phantomXmanual');
          xhr.send(payload)
        } else {
          xhr.open('DELETE', this.constructUrl('/manuals/phantomXmanual'));
          xhr.send();
        }
      }
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.checked;
      const name_ = target.name;

      var jsonObj;
      if (name_.startsWith("manual")) {
        jsonObj = {jacamo: {changeManual: {name: name_, enabled: value}}};
      } else {
        jsonObj = {jacamo: {changeArtifact: {name: name_, enabled: value}}};
      }
      console.log("setting " + name_ + " enabled: " + value);
      this.ws.send(JSON.stringify(jsonObj)); // notifies jacamo app
      console.log('preparing request to yggdrasil...');
      var xhr = new XMLHttpRequest();
      // get a callback when the server responds
      xhr.addEventListener('load', () => {
          console.log("Received response from Yggdrasil:")
          console.log(xhr.responseText)
        });

      switch (name_) {
          case 'robot1':
            if (value) {
                // activate robot1 (doesn't have a manual)
                this.createRobot(xhr, 1);
            } else {
                // deactivate robot1
                this.removeRobot(xhr, 1);
            }
              break;
          case 'robot2':
            this.changeManual('manual2', value);
            if (value) {
              // activate robot2
              this.createRobot(xhr, 2);
            } else {
              // deactivate robot2
              this.removeRobot(xhr, 2);
            }
            break;
          case 'robot3':
            this.changeManual('manual3', value);
            if (value) {
              // activate robot3
              this.createRobot(xhr, 3);
            } else {
              // deactivate robot3
              this.removeRobot(xhr, 3);
            }
            break;
          case 'manual2':
            this.changeManual(name_, value, true);
            break;
          case 'manual3':
            this.changeManual(name_, value, false);
            break;
          default:
              console.log("unexpected name: " + name_);
      }

      this.setState({
        [name_]: value
      }, function() {
        console.log("state is updated, updating workspace " + value);
        console.log(this.state)
        this.updateWorkspace();
      });
    }

    render() {
      return (
        <form className="leftbound">
          <label className="marginRight">
            Driver Robot:
            <input
              name="robot2"
              type="checkbox"
              checked={this.state.robot2}
              onChange={this.handleInputChange} />
          </label>
          <label className="marginRight">
            Robot Arm 1:
            <input
              name="robot1"
              type="checkbox"
              checked={this.state.robot1}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Robot Arm 2:
            <input
              name="robot3"
              type="checkbox"
              checked={this.state.robot3}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label className="largeMarginRight">
            Manual:
            <input
              name="manual2"
              type="checkbox"
              checked={this.state.manual2}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Manual:
            <input
              name="manual3"
              type="checkbox"
              checked={this.state.manual3}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
}

export default Configuration;
