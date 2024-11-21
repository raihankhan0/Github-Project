(() => {
  "use strict";
  var e = {
      mode: "multiple",
      showCheckBoxesMode: "always",
      selectAllMode: "allPages",
    },
    t = { mode: "row", allowUpdating: !0, allowAdding: !0 };
  function a(e, t) {
    return function (a) {
      for (var i = t, o = e.length - 1; o >= 0; o--)
        e[o].rowKey === a.key && e[o].grid === i && e.splice(o, 1);
      a.brokenRules.forEach(function (t) {
        e.push({
          grid: i,
          rowKey: a.key,
          type: t.type,
          message: "".concat(i, " - ").concat(t.message),
        });
      }),
        console.log(e);
    };
  }
  function i(e, t) {
    return [
      {
        location: "after",
        widget: "dxButton",
        options: {
          icon: "plus",
          text: "Add Row",
          onClick: function () {
            e.addRow();
          },
        },
      },
      {
        location: "after",
        widget: "dxButton",
        options: {
          icon: "trash",
          text: "Delete Selected",
          onClick: function () {
            var a, i, o;
            (i = t),
              0 !== (o = (a = e).getSelectedRowsData()).length
                ? DevExpress.ui.dialog
                    .confirm(
                      "Are you sure you want to delete ".concat(
                        o.length,
                        " row(s)?"
                      ),
                      "Confirm Deletion"
                    )
                    .done(function (e) {
                      e &&
                        (o.forEach(function (e) {
                          var t = i.findIndex(function (t) {
                            return t.line === e.line;
                          });
                          t > -1 && i.splice(t, 1);
                        }),
                        i.forEach(function (e, t) {
                          return (e.line = t + 1);
                        }),
                        console.log("Raihan please look here", i),
                        a.cancelEditData(),
                        a.option("dataSource", i),
                        a.clearSelection(),
                        DevExpress.ui.notify(
                          "".concat(o.length, " row(s) deleted successfully."),
                          "success",
                          2e3
                        ));
                    })
                : DevExpress.ui.notify(
                    "Please select the rows to delete.",
                    "warning",
                    2e3
                  );
          },
        },
      },
    ];
  }
  function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var a = 0, i = Array(t); a < t; a++) i[a] = e[a];
    return i;
  }
  function n(e, t) {
    return [
      {
        dataField: "sequence",
        caption: "Sequence",
        allowEditing: !0,
        validationRules: [
          { type: "required", message: "Sequence is required." },
          {
            type: "custom",
            message: "Sequence must be unique.",
            validationCallback: function (e) {
              var a = e.value;
              return !t.some(function (t) {
                return t.sequence === a && t.line !== e.data.line;
              });
            },
          },
        ],
      },
      {
        dataField: "specNumber",
        caption: "Specification Number",
        allowEditing: !1,
      },
      { dataField: "revNo", caption: "Rev. No", allowEditing: !0 },
      {
        dataField: "specName",
        caption: "Specification Name",
        lookup: { dataSource: e, valueExpr: "id", displayExpr: "name" },
        setCellValue: function (e, t) {
          (e.specName = t), (e.specNumber = t);
        },
        validationRules: [
          { type: "required", message: "Spec Name is required." },
        ],
        allowEditing: !0,
      },
      { dataField: "remarks", caption: "Remarks (if any)", allowEditing: !0 },
    ];
  }
  function r(e) {
    return function (t) {
      var a,
        i = Math.max.apply(
          Math,
          ((a = e.map(function (e) {
            return e.sequence;
          })),
          (function (e) {
            if (Array.isArray(e)) return o(e);
          })(a) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(a) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return o(e, t);
                var a = {}.toString.call(e).slice(8, -1);
                return (
                  "Object" === a && e.constructor && (a = e.constructor.name),
                  "Map" === a || "Set" === a
                    ? Array.from(e)
                    : "Arguments" === a ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
                    ? o(e, t)
                    : void 0
                );
              }
            })(a) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()).concat([0])
        );
      (t.data.line = e.length + 1),
        (t.data.sequence = i + 1),
        (t.data.revNo = 0);
    };
  }
  var d = [
    { dataField: "line", caption: "ID", allowEditing: !1 },
    {
      dataField: "restrictionDetails",
      caption: "Restriction Details",
      validationRules: [
        { type: "required", message: "Restriction Details is required." },
      ],
    },
  ];
  function l(e) {
    return function (t) {
      (t.data.line = e.length + 1),
        (t.data.transactionLineId = 0),
        (t.data.transactionId = 12345);
    };
  }
  function c(e, t) {
    return [
      { dataField: "line", caption: "ID", allowEditing: !1 },
      {
        dataField: "agencyType",
        caption: "Type",
        lookup: { dataSource: t, valueExpr: "code", displayExpr: "setupFor" },
        setCellValue: function (e, t) {
          (e.agencyType = t), (e.inspectionAgencyName = null);
        },
      },
      {
        dataField: "inspectionAgencyName",
        caption: "Agency Name",
        lookup: {
          dataSource: function (t) {
            return t.data
              ? e.filter(function (e) {
                  return e.masterSetupCode === t.data.agencyType;
                })
              : e;
          },
          valueExpr: "code",
          displayExpr: "fieldName",
        },
        validationRules: [
          {
            type: "required",
            message: "Please select agency type first and then select agency",
          },
        ],
      },
      {
        dataField: "appointedBy",
        caption: "Appointed By",
        allowEditing: !0,
        validationRules: [
          { type: "required", message: "Appointed By Is Required" },
        ],
      },
      {
        dataField: "remark",
        caption: "Remarks",
        allowEditing: !0,
        validationRules: [{ type: "required", message: "Remark is required" }],
      },
    ];
  }
  function s(e) {
    return function (t) {
      (t.data.line = e.length + 1),
        (t.data.transactionLineId = 0),
        (t.data.transactionId = 12345),
        (t.data.remark = "N.A");
    };
  }
  $(function () {
    var o,
      u = [
        {
          dataField: "clientCode",
          caption: "Client Code",
          editorType: "dxSelectBox",
          editorOptions: { dataSource: [1, 2, 3, 4], value: "" },
        },
        { dataField: "projectName", caption: "Project Name" },
        { dataField: "endUserName", caption: "End User Name" },
        { dataField: "reviewedBy", caption: "Reviewed By" },
        { dataField: "reviewDate", caption: "Review Date", dataType: "date" },
        { dataField: "woNo", caption: "Work Order Number" },
        { dataField: "amendmentNo", caption: "Amendment Number" },
        {
          dataField: "amendmentDate",
          caption: "Amendment Date",
          dataType: "date",
        },
        { dataField: "offerRefNo", caption: "Offer Reference Number" },
        {
          dataField: "offerRefDate",
          caption: "Offer Reference Date",
          dataType: "date",
        },
        { dataField: "loiNo", caption: "LOI Number" },
        { dataField: "loiDate", caption: "LOI Date", dataType: "date" },
        {
          dataField: "technicalConsultantName",
          caption: "Technical Consultant Name",
        },
        {
          dataField: "certifyingAuthority",
          caption: "Certifying Authority",
          editorType: "dxSelectBox",
          editorOptions: { dataSource: [100, 200, 254, 300], value: "" },
        },
        {
          type: "buttons",
          buttons: [
            {
              icon: "edit",
              onClick: function (e) {
                $("#gridContainer").hide(), S(e.row.data, !0);
              },
            },
          ],
        },
      ],
      p = [],
      m = [
        {
          transactionId: 12345,
          clientCode: 2,
          projectName: "Amazon Proj",
          endUserName: "Harsh Shetty",
          reviewedBy: "SRaihan Khanna",
          reviewDate: "2024-11-06",
          woNo: "12345dwq",
          amendmentNo: "545156asd",
          amendmentDate: "2024-11-06",
          offerRefNo: "BE/SM/QT/1234",
          offerRefDate: "2024-11-06",
          loiNo: "545223dfsa",
          loiDate: "2024-11-06",
          technicalConsultantName: "Worley",
          certifyingAuthority: 254,
        },
      ],
      f = null,
      y = null,
      x = [],
      g = [
        { id: 1, name: "Spec A" },
        { id: 2, name: "Spec B" },
        { id: 3, name: "Spec C" },
      ],
      v = null,
      h = [],
      w = [
        { code: 1, setupFor: "Sea" },
        { code: 2, setupFor: "Land" },
        { code: 3, setupFor: "Air" },
      ],
      N = [
        { code: 1, masterSetupCode: 1, fieldName: "Frog" },
        { code: 2, masterSetupCode: 1, fieldName: "Shark" },
        { code: 3, masterSetupCode: 2, fieldName: "Lion" },
        { code: 4, masterSetupCode: 2, fieldName: "Elephant" },
        { code: 5, masterSetupCode: 3, fieldName: "Eagle" },
        { code: 6, masterSetupCode: 3, fieldName: "Parrot" },
        { code: 7, masterSetupCode: 2, fieldName: "Frog" },
      ],
      C = null,
      D = [];
    function b(e) {
      return [{ type: "required", message: "".concat(e, " is required") }];
    }
    function S(u, S) {
      S ? u.transactionId : m.length && m[m.length - 1].transactionId;
      var R = [
        {
          dataField: "clientCode",
          label: { text: "Client Code" },
          editorType: "dxSelectBox",
          editorOptions: {
            dataSource: [1, 2, 3, 4],
            value: S ? u.clientCode : "",
            onValueChanged: function (e) {
              console.log("Client Code changed to: ".concat(e.value));
            },
          },
        },
        {
          dataField: "projectName",
          label: { text: "Project Name" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.projectName : "" },
          validationRules: b("Project name"),
        },
        {
          dataField: "endUserName",
          label: { text: "End User Name" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.endUserName : "" },
        },
        {
          dataField: "reviewedBy",
          label: { text: "Reviewed By" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.reviewedBy : "" },
          validationRules: b("Reviewed By"),
        },
        {
          dataField: "reviewDate",
          label: { text: "Review Date" },
          editorType: "dxDateBox",
          editorOptions: { value: S ? u.reviewDate : null },
        },
        {
          dataField: "woNo",
          label: { text: "Work Order Number" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.woNo : "" },
        },
        {
          dataField: "amendmentNo",
          label: { text: "Amendment Number" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.amendmentNo : "" },
        },
        {
          dataField: "amendmentDate",
          label: { text: "Amendment Date" },
          editorType: "dxDateBox",
          editorOptions: { value: S ? u.amendmentDate : null },
        },
        {
          dataField: "offerRefNo",
          label: { text: "Offer Reference Number" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.offerRefNo : "" },
        },
        {
          dataField: "offerRefDate",
          label: { text: "Offer Reference Date" },
          editorType: "dxDateBox",
          editorOptions: { value: S ? u.offerRefDate : null },
        },
        {
          dataField: "loiNo",
          label: { text: "LOI Number" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.loiNo : "" },
        },
        {
          dataField: "loiDate",
          label: { text: "LOI Date" },
          editorType: "dxDateBox",
          editorOptions: { value: S ? u.loiDate : null },
        },
        {
          dataField: "technicalConsultantName",
          label: { text: "Technical Consultant Name" },
          editorType: "dxTextBox",
          editorOptions: { value: S ? u.technicalConsultantName : "" },
        },
        {
          dataField: "certifyingAuthority",
          label: { text: "Certifying Authority" },
          editorType: "dxSelectBox",
          editorOptions: {
            dataSource: [100, 200, 254, 300],
            value: S ? u.certifyingAuthority : "",
          },
        },
      ];
      $("#accordionContainer").show(),
        $("#tabsContainer").show(),
        $("#buttonContainer").html("").show(),
        $("#accordionContainer").dxAccordion({
          items: [
            {
              title: "Form Details",
              template: function () {
                var e = $("<div>");
                return (
                  (f = e
                    .dxForm({ formData: u, colCount: 2, items: R })
                    .dxForm("instance")),
                  e
                );
              },
            },
          ],
          collapsible: !1,
          selectedIndex: 0,
        }),
        $("#tabsContainer").dxTabPanel({
          items: [
            {
              title: "Requirements",
              template: function () {
                return $("<div>").dxAccordion({
                  items: [
                    {
                      title: "Specs Grid",
                      template: function () {
                        S || (x = []);
                        var o = $("<div>");
                        return (
                          (y = o
                            .dxDataGrid({
                              dataSource: x,
                              keyExpr: "line",
                              selection: e,
                              editing: t,
                              columns: n(g, x),
                              showBorders: !0,
                              onInitNewRow: r(x),
                              onRowValidating: a(p, "Specs Grid"),
                            })
                            .dxDataGrid("instance")).option("toolbar", {
                            items: i(y, x),
                          }),
                          o
                        );
                      },
                    },
                    {
                      title: "Material Src Restriction Grid",
                      template: function () {
                        S || (h = []);
                        var o = $("<div>");
                        return (
                          (v = o
                            .dxDataGrid({
                              dataSource: h,
                              keyExpr: "line",
                              selection: e,
                              editing: t,
                              columns: d,
                              showBorders: !0,
                              onInitNewRow: l(h),
                              onRowValidating: a(
                                p,
                                "Material Source Restriction"
                              ),
                            })
                            .dxDataGrid("instance")).option("toolbar", {
                            items: i(v, h),
                          }),
                          o
                        );
                      },
                    },
                    {
                      title: "TPIA Grid",
                      template: function () {
                        S || (D = []);
                        var o = $("<div>");
                        return (
                          (C = o
                            .dxDataGrid({
                              dataSource: D,
                              keyExpr: "line",
                              selection: e,
                              editing: t,
                              columns: c(N, w),
                              showBorders: !0,
                              onInitNewRow: s(D),
                              onRowValidating: a(p, "TPIA Grid"),
                            })
                            .dxDataGrid("instance")).option("toolbar", {
                            items: i(C, D),
                          }),
                          o
                        );
                      },
                    },
                  ],
                  collapsible: !0,
                  selectedIndex: 0,
                });
              },
            },
            {
              title: "Tech Requirements",
              template: function () {
                return $("<div>").text("You are in Tech Requirements");
              },
            },
          ],
          deferRendering: !1,
          selectedIndex: 0,
        }),
        $("<div>")
          .dxButton({
            text: "Save",
            onClick: function () {
              if ((f.option("formData"), (o = f.validate()).isValid))
                if (p.length > 0)
                  DevExpress.ui.notify({
                    message: p[0].message,
                    type: "error",
                    displayTime: 1e3,
                  });
                else {
                  var e = f.option("formData");
                  (e.transactionId = null),
                    S || m.push(e),
                    $("#gridContainer").dxDataGrid("instance").refresh(),
                    console.log("Grid Data:", m),
                    console.log("Specs Detail:", x),
                    console.log("Mat Src Res Data", h),
                    alert("Saved Successfully"),
                    $("#accordionContainer").hide(),
                    $("#tabsContainer").hide(),
                    $("#buttonContainer").hide(),
                    $("#gridContainer").show();
                }
              else
                DevExpress.ui.notify({
                  message: o.brokenRules[0].message,
                  type: "error",
                  displayTime: 1e3,
                });
            },
          })
          .appendTo("#buttonContainer"),
        $("<div>")
          .dxButton({
            text: "Cancel",
            onClick: function () {
              $("#accordionContainer").hide(),
                $("#tabsContainer").hide(),
                $("#buttonContainer").hide(),
                $("#gridContainer").show();
            },
          })
          .appendTo("#buttonContainer");
    }
    $("#gridContainer").dxDataGrid({
      dataSource: m,
      columns: u,
      editing: {
        mode: "row",
        allowUpdating: !1,
        allowDeleting: !1,
        allowAdding: !1,
      },
      onToolbarPreparing: function (e) {
        e.toolbarOptions.items.push({
          widget: "dxButton",
          options: {
            icon: "add",
            text: "Add New Record",
            onClick: function () {
              $("#gridContainer").hide(), S({}, !1);
            },
          },
          location: "after",
        });
      },
    });
  });
})();
