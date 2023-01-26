sap.ui.define([
    "./BaseController",
    'sap/ui/core/library',
    "../model/formatter"
], function (BaseController, coreLibrary, formatter) {
    "use strict";

    const ValueState = coreLibrary.ValueState;

    return BaseController.extend("zsd041salesorders.controller.Create", {

        formatter: formatter,


        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        onSave: function () {

            const oSalesOrder = {
              "SoldTo" : this.getView().byId("soldTo").getValue(),
              "CustRef" : this.getView().byId("custRef").getValue(),
              "DelivDate" : this.getView().byId("delivDate").getValue()
            };
           
            this.getModel().create("/SalesOrderSet", oSalesOrder,
            {
                succes: function (oFeedback) { console.log(oFeedback);},
                error: function (oError) { console.error(oError);}
            });

            this.clearForm();
            this.getOwnerComponent().getRouter().navTo("list", { }, true);
            //window.location.reload();
        },

        onCancel: function () {

            this.clearForm();
            this.getOwnerComponent().getRouter().navTo("list", { }, true);
        },

        clearForm: function () {
            this.getView().byId("soldTo").setValue("");
            this.getView().byId("custRef").setValue("");
            this.getView().byId("delivDate").setValue("");
        },

        /**
         * Event handler for the bypassed event, which is fired when no routing pattern matched.
         * If there was an object selected in the list, that selection is removed.
         * @public
         */
        onBypassed: function () {
            this._oList.removeSelections(true);
        },

        /**
         * Event handler for navigating back.
         * We navigate back in the browser history
         * @public
         */
        onNavBack: function () {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        },

        handleLiveChange: function (oEvent) {
            var oTextArea = oEvent.getSource(),
                iValueLength = oTextArea.getValue().length,
                iMaxLength = oTextArea.getMaxLength(),
                sState = iValueLength > iMaxLength ? ValueState.Warning : ValueState.None;

            oTextArea.setValueState(sState);
        },

        /* =========================================================== */
        /* begin: internal methods                                     */
        /* =========================================================== */

        /**
        * Set the full screen mode to false and navigate to master page
        */
        onCloseDetailPress: function () {
            var oModel = this.getView().getModel("app");
            this.getOwnerComponent().getRouter().navTo("list", {}, true);
        },

        /**
         * Toggle between full and non full screen mode.
         */
        toggleFullScreen: function () {
            var bFullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
            if (!bFullScreen) {
                // store current layout and go full screen
                this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
                this.getModel("appView").setProperty("/layout", "MidColumnFullScreen");
            } else {
                // reset to previous layout
                this.getModel("appView").setProperty("/layout", this.getModel("appView").getProperty("/previousLayout"));
            }
        }

    });

});