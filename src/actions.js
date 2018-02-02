import * as React from "react";
import { render } from "react-dom";

import {
  Dropdown,
  Icon,
  Button,
  Modal
} from "semantic-ui-react";


export class ModalViewButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleSendToOpenMedia = this.handleSendToOpenMedia.bind(this);
    this.handleDownload = this.handleDownload.bind(this);

    this.state = {
      
    };
  }
  
    handleSendToOpenMedia(e) {
      SendToOpenMedia(this.props["cardexp_itemJSON"]);
    //  console.log(this.props["cardexp_itemJSON"]);
    }

    handleDownload(e) {
      DownloadItem(this.props["cardexp_itemJSON"]);
    }
      render() {
        return (
         
           <Modal.Actions>
          <Button primary content="Send to OpenMedia" icon="share" onClick={this.handleSendToOpenMedia} />
          <Button secondary content="Download" icon="download" onClick={this.handleDownload}/>
          </Modal.Actions>
        
        );
      }
    }

export class CardsCornerPopup extends React.Component {
    constructor(props) {
      super(props);
      this.handleSendToOpenMedia = this.handleSendToOpenMedia.bind(this);
     
      this.state = {
        
      };
    }
    
    handleSendToOpenMedia(e) {
      SendToOpenMedia(this.props["cardexp_itemJSON"]);
    //  console.log(this.props["cardexp_itemJSON"]);
    }



    render() {
      return (
       
          <Dropdown
            onClick={e => e.preventDefault()}

            className="icon"
            icon={<Icon link name="ellipsis vertical" color="grey" />}
            style={{float:"right"}}
          >
            <Dropdown.Menu style={{ left: "auto", right: 0 }}>
              <Dropdown.Item text="Send to OpenMedia" icon="share" onClick={this.handleSendToOpenMedia}/>
        </Dropdown.Menu>
          </Dropdown>
        
              );
    }
  }

function SendToOpenMedia (cardexp_itemJSON) {
  //  alert(e.target.id);
    alert("Function SendToOpenMedia triggered: " + JSON.stringify(cardexp_itemJSON));
  
  }
  
  function DownloadItem (cardexp_itemJSON) {
    //  alert(e.target.id);
    alert("Function DownloadItem triggered: " +  JSON.stringify(cardexp_itemJSON));
    
    }
