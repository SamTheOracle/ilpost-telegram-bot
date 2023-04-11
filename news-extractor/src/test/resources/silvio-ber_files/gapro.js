!function(){"use strict";var t="2.1.5";const e={universalga:"ga",trackerName:"",label:"file",trackingobject:"_gaq",gtag:"gtag"};class i{constructor(t,i){if(this.player=t,this.utils=t.utils,this._=t._,this._config=this._.extend({},e,i),this.onGaTrack=i.debug&&this._.isFunction(i.onGaTrack)?i.onGaTrack:this.utils.noop,this._universalWrapper=void 0,this._currItem=void 0,this._state=void 0,this._casting=!1,("string"!=typeof this._config.gtag||void 0===window[this._config.gtag])&&"function"!=typeof this._config.gtag){const t=this._getTrackingObject();if(!t||"string"==typeof t)return void this.utils.log("Could not find Google Analytics Interface.",this._config)}this.player.on("playlistItem",(t=>{const e=t.item;var i,n,a;this._currItem=this._.extend({played:!1},e),this._currItem.label=(i=this.utils,n=e,a=this._config.label,n?a&&n[a]&&n[a].length?"file"===a?i.getAbsolutePath(n[a]):n[a]:n.file?n.file:n.sources?((t,e)=>{const i=[];for(let t=e.length-1;t--;)e[t].file&&i.push(e[t].file);return i.sort(),t.getAbsolutePath(i[0])})(i,n.sources):"":"")})),this.player.on("play",(t=>{this._currItem.played?"paused"===this._state&&this.trackEventNew("Resume","interaction"!==t.playReason):(this._currItem.played=!0,this.trackEventNew("Play","interaction"!==t.playReason)),this._state="playing"})),this.player.on("buffer",(()=>{this.trackEventNew("Buffer",!0),this._state="buffering"})),this.player.on("pause",(t=>{this.trackEventNew("Pause","interaction"!==t.pauseReason),this._state="paused"})),this.player.on("seek",(()=>{this.trackEventNew("Seek",!0)})),this.player.on("complete",(()=>{this.trackEventNew("Complete",!0)})),this.player.on("cast",(t=>{this._casting=Boolean(t.active)}))}_getTrackingObject(){return window[this._config.universalga]?(this._universalWrapper||(this._universalWrapper={push:t=>{const e=window[this._config.universalga],i=this._config.trackerName?`${this._config.trackerName}.send`:"send";t.splice(0,1,i,"event"),t[5]={nonInteraction:t[6]},t.length=6,e.apply(window,t)}}),this._universalWrapper):"string"==typeof this._config.trackingobject?window[this._config.trackingobject]:this._config.trackingobject}trackAsync(t,e,i,n){this._getTrackingObject().push(["_trackEvent",t,e,i,void 0,n])}trackSync(t,e,i,n){this._getTrackingObject()._trackEvent(t,e,i,void 0,n)}trackGtag(t,e,i,n,a){t("event",i,{event_category:e,event_label:n,event_action:i,non_interaction:a})}trackEventNew(t,e){let i="";const n="function"==typeof this._config.gtag?this._config.gtag:window[this._config.gtag];this._casting||(n?(i="gtag",this.trackGtag(n,"JW Player Video",t,this._currItem.label,e)):void 0!==this._getTrackingObject()._trackEvent?(i="sync",this.trackSync("JW Player Video",t,this._currItem.label,e)):void 0!==this._getTrackingObject().push&&(i="async",this.trackAsync("JW Player Video",t,this._currItem.label,e)),this.onGaTrack({type:i,category:"JW Player Video",action:t,label:this._currItem.label,nonInteraction:e}))}}i.version=t;(window.jwplayerPluginJsonp||window.jwplayer().registerPlugin)("gapro","8.0.0",i)}();