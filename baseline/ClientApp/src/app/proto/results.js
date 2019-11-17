/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots.result_root || ($protobuf.roots.result_root = {});

export const Jde = $root.Jde = (() => {

    /**
     * Namespace Jde.
     * @exports Jde
     * @namespace
     */
    const Jde = {};

    Jde.Markets = (function() {

        /**
         * Namespace Markets.
         * @memberof Jde
         * @namespace
         */
        const Markets = {};

        Markets.Proto = (function() {

            /**
             * Namespace Proto.
             * @memberof Jde.Markets
             * @namespace
             */
            const Proto = {};

            Proto.Results = (function() {

                /**
                 * Namespace Results.
                 * @memberof Jde.Markets.Proto
                 * @namespace
                 */
                const Results = {};

                Results.MessageValue = (function() {

                    /**
                     * Properties of a MessageValue.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IMessageValue
                     * @property {Jde.Markets.Proto.Results.EResults|null} [Type] MessageValue Type
                     * @property {string|null} [StringValue] MessageValue StringValue
                     * @property {number|null} [IntValue] MessageValue IntValue
                     */

                    /**
                     * Constructs a new MessageValue.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a MessageValue.
                     * @implements IMessageValue
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IMessageValue=} [properties] Properties to set
                     */
                    function MessageValue(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * MessageValue Type.
                     * @member {Jde.Markets.Proto.Results.EResults} Type
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @instance
                     */
                    MessageValue.prototype.Type = 0;

                    /**
                     * MessageValue StringValue.
                     * @member {string} StringValue
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @instance
                     */
                    MessageValue.prototype.StringValue = "";

                    /**
                     * MessageValue IntValue.
                     * @member {number} IntValue
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @instance
                     */
                    MessageValue.prototype.IntValue = 0;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * MessageValue Value.
                     * @member {"StringValue"|"IntValue"|undefined} Value
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @instance
                     */
                    Object.defineProperty(MessageValue.prototype, "Value", {
                        get: $util.oneOfGetter($oneOfFields = ["StringValue", "IntValue"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new MessageValue instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.IMessageValue=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.MessageValue} MessageValue instance
                     */
                    MessageValue.create = function create(properties) {
                        return new MessageValue(properties);
                    };

                    /**
                     * Encodes the specified MessageValue message. Does not implicitly {@link Jde.Markets.Proto.Results.MessageValue.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.IMessageValue} message MessageValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageValue.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Type);
                        if (message.StringValue != null && message.hasOwnProperty("StringValue"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.StringValue);
                        if (message.IntValue != null && message.hasOwnProperty("IntValue"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.IntValue);
                        return writer;
                    };

                    /**
                     * Encodes the specified MessageValue message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.MessageValue.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.IMessageValue} message MessageValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageValue.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a MessageValue message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.MessageValue} MessageValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MessageValue.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.MessageValue();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Type = reader.int32();
                                break;
                            case 2:
                                message.StringValue = reader.string();
                                break;
                            case 3:
                                message.IntValue = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a MessageValue message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.MessageValue} MessageValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MessageValue.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a MessageValue message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MessageValue.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        let properties = {};
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            switch (message.Type) {
                            default:
                                return "Type: enum value expected";
                            case 0:
                            case -1:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 45:
                            case 46:
                            case 47:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                            case 58:
                            case 59:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70:
                            case 71:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 80:
                            case 81:
                            case 82:
                            case 83:
                            case 84:
                            case 85:
                            case 86:
                            case 87:
                            case 88:
                            case 89:
                            case 90:
                            case 91:
                            case 92:
                            case 93:
                            case 94:
                            case 95:
                            case 96:
                            case 97:
                            case 98:
                            case 99:
                                break;
                            }
                        if (message.StringValue != null && message.hasOwnProperty("StringValue")) {
                            properties.Value = 1;
                            if (!$util.isString(message.StringValue))
                                return "StringValue: string expected";
                        }
                        if (message.IntValue != null && message.hasOwnProperty("IntValue")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            if (!$util.isInteger(message.IntValue))
                                return "IntValue: integer expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a MessageValue message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.MessageValue} MessageValue
                     */
                    MessageValue.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.MessageValue)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.MessageValue();
                        switch (object.Type) {
                        case "Accept":
                        case 0:
                            message.Type = 0;
                            break;
                        case "MultiEnd":
                        case -1:
                            message.Type = -1;
                            break;
                        case "TickPriceMessage":
                        case 1:
                            message.Type = 1;
                            break;
                        case "TickSizeMessage":
                        case 2:
                            message.Type = 2;
                            break;
                        case "OrderStatus":
                        case 3:
                            message.Type = 3;
                            break;
                        case "ErrorMessage":
                        case 4:
                            message.Type = 4;
                            break;
                        case "OpenOrder":
                        case 5:
                            message.Type = 5;
                            break;
                        case "ACCT_VALUE":
                        case 6:
                            message.Type = 6;
                            break;
                        case "PORTFOLIO_VALUE":
                        case 7:
                            message.Type = 7;
                            break;
                        case "ACCT_UPDATE_TIME":
                        case 8:
                            message.Type = 8;
                            break;
                        case "NextValidId":
                        case 9:
                            message.Type = 9;
                            break;
                        case "CONTRACT_DATA":
                        case 10:
                            message.Type = 10;
                            break;
                        case "ExecutionData":
                        case 11:
                            message.Type = 11;
                            break;
                        case "MARKET_DEPTH":
                        case 12:
                            message.Type = 12;
                            break;
                        case "MARKET_DEPTH_L2":
                        case 13:
                            message.Type = 13;
                            break;
                        case "NEWS_BULLETINS":
                        case 14:
                            message.Type = 14;
                            break;
                        case "ManagedAccounts":
                        case 15:
                            message.Type = 15;
                            break;
                        case "RECEIVE_FA":
                        case 16:
                            message.Type = 16;
                            break;
                        case "HistoricalData_":
                        case 17:
                            message.Type = 17;
                            break;
                        case "BOND_CONTRACT_DATA":
                        case 18:
                            message.Type = 18;
                            break;
                        case "SCANNER_PARAMETERS":
                        case 19:
                            message.Type = 19;
                            break;
                        case "SCANNER_DATA":
                        case 20:
                            message.Type = 20;
                            break;
                        case "TICK_OPTION_COMPUTATION":
                        case 21:
                            message.Type = 21;
                            break;
                        case "TickGenericMessage":
                        case 45:
                            message.Type = 45;
                            break;
                        case "TickStringMessage":
                        case 46:
                            message.Type = 46;
                            break;
                        case "TICK_EFP":
                        case 47:
                            message.Type = 47;
                            break;
                        case "CurrentTime":
                        case 49:
                            message.Type = 49;
                            break;
                        case "RealTimeBars":
                        case 50:
                            message.Type = 50;
                            break;
                        case "FUNDAMENTAL_DATA":
                        case 51:
                            message.Type = 51;
                            break;
                        case "ContractDataEnd":
                        case 52:
                            message.Type = 52;
                            break;
                        case "OPEN_ORDER_END":
                        case 53:
                            message.Type = 53;
                            break;
                        case "ACCT_DOWNLOAD_END":
                        case 54:
                            message.Type = 54;
                            break;
                        case "EXECUTION_DATA_END":
                        case 55:
                            message.Type = 55;
                            break;
                        case "DELTA_NEUTRAL_VALIDATION":
                        case 56:
                            message.Type = 56;
                            break;
                        case "TickSnapshotEnd":
                        case 57:
                            message.Type = 57;
                            break;
                        case "MarketDataType":
                        case 58:
                            message.Type = 58;
                            break;
                        case "COMMISSION_REPORT":
                        case 59:
                            message.Type = 59;
                            break;
                        case "PositionData":
                        case 61:
                            message.Type = 61;
                            break;
                        case "PositionEnd":
                        case 62:
                            message.Type = 62;
                            break;
                        case "ACCOUNT_SUMMARY":
                        case 63:
                            message.Type = 63;
                            break;
                        case "ACCOUNT_SUMMARY_END":
                        case 64:
                            message.Type = 64;
                            break;
                        case "VERIFY_MESSAGE_API":
                        case 65:
                            message.Type = 65;
                            break;
                        case "VERIFY_COMPLETED":
                        case 66:
                            message.Type = 66;
                            break;
                        case "DISPLAY_GROUP_LIST":
                        case 67:
                            message.Type = 67;
                            break;
                        case "DISPLAY_GROUP_UPDATED":
                        case 68:
                            message.Type = 68;
                            break;
                        case "VERIFY_AND_AUTH_MESSAGE_API":
                        case 69:
                            message.Type = 69;
                            break;
                        case "VERIFY_AND_AUTH_COMPLETED":
                        case 70:
                            message.Type = 70;
                            break;
                        case "PositionMulti":
                        case 71:
                            message.Type = 71;
                            break;
                        case "PositionMultiEnd":
                        case 72:
                            message.Type = 72;
                            break;
                        case "AccountUpdateMulti_":
                        case 73:
                            message.Type = 73;
                            break;
                        case "ACCOUNT_UPDATE_MULTI_END":
                        case 74:
                            message.Type = 74;
                            break;
                        case "SECURITY_DEFINITION_OPTION_PARAMETER":
                        case 75:
                            message.Type = 75;
                            break;
                        case "SECURITY_DEFINITION_OPTION_PARAMETER_END":
                        case 76:
                            message.Type = 76;
                            break;
                        case "SOFT_DOLLAR_TIERS":
                        case 77:
                            message.Type = 77;
                            break;
                        case "FAMILY_CODES":
                        case 78:
                            message.Type = 78;
                            break;
                        case "SYMBOL_SAMPLES":
                        case 79:
                            message.Type = 79;
                            break;
                        case "MKT_DEPTH_EXCHANGES":
                        case 80:
                            message.Type = 80;
                            break;
                        case "TickRequiredParams":
                        case 81:
                            message.Type = 81;
                            break;
                        case "SMART_COMPONENTS":
                        case 82:
                            message.Type = 82;
                            break;
                        case "NEWS_ARTICLE":
                        case 83:
                            message.Type = 83;
                            break;
                        case "TICK_NEWS":
                        case 84:
                            message.Type = 84;
                            break;
                        case "NEWS_PROVIDERS":
                        case 85:
                            message.Type = 85;
                            break;
                        case "HISTORICAL_NEWS":
                        case 86:
                            message.Type = 86;
                            break;
                        case "HISTORICAL_NEWS_END":
                        case 87:
                            message.Type = 87;
                            break;
                        case "HEAD_TIMESTAMP":
                        case 88:
                            message.Type = 88;
                            break;
                        case "HISTOGRAM_DATA":
                        case 89:
                            message.Type = 89;
                            break;
                        case "HISTORICAL_DATA_UPDATE":
                        case 90:
                            message.Type = 90;
                            break;
                        case "REROUTE_MKT_DATA_REQ":
                        case 91:
                            message.Type = 91;
                            break;
                        case "REROUTE_MKT_DEPTH_REQ":
                        case 92:
                            message.Type = 92;
                            break;
                        case "MARKET_RULE":
                        case 93:
                            message.Type = 93;
                            break;
                        case "PNL":
                        case 94:
                            message.Type = 94;
                            break;
                        case "PNL_SINGLE":
                        case 95:
                            message.Type = 95;
                            break;
                        case "HISTORICAL_TICKS":
                        case 96:
                            message.Type = 96;
                            break;
                        case "HISTORICAL_TICKS_BID_ASK":
                        case 97:
                            message.Type = 97;
                            break;
                        case "HISTORICAL_TICKS_LAST":
                        case 98:
                            message.Type = 98;
                            break;
                        case "TICK_BY_TICK":
                        case 99:
                            message.Type = 99;
                            break;
                        }
                        if (object.StringValue != null)
                            message.StringValue = String(object.StringValue);
                        if (object.IntValue != null)
                            message.IntValue = object.IntValue | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a MessageValue message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.MessageValue} message MessageValue
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MessageValue.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults)
                            object.Type = options.enums === String ? "Accept" : 0;
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            object.Type = options.enums === String ? $root.Jde.Markets.Proto.Results.EResults[message.Type] : message.Type;
                        if (message.StringValue != null && message.hasOwnProperty("StringValue")) {
                            object.StringValue = message.StringValue;
                            if (options.oneofs)
                                object.Value = "StringValue";
                        }
                        if (message.IntValue != null && message.hasOwnProperty("IntValue")) {
                            object.IntValue = message.IntValue;
                            if (options.oneofs)
                                object.Value = "IntValue";
                        }
                        return object;
                    };

                    /**
                     * Converts this MessageValue to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.MessageValue
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MessageValue.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return MessageValue;
                })();

                Results.StringResult = (function() {

                    /**
                     * Properties of a StringResult.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IStringResult
                     * @property {Jde.Markets.Proto.Results.EResults|null} [Type] StringResult Type
                     * @property {number|null} [RequestId] StringResult RequestId
                     * @property {string|null} [Value] StringResult Value
                     */

                    /**
                     * Constructs a new StringResult.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a StringResult.
                     * @implements IStringResult
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IStringResult=} [properties] Properties to set
                     */
                    function StringResult(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * StringResult Type.
                     * @member {Jde.Markets.Proto.Results.EResults} Type
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @instance
                     */
                    StringResult.prototype.Type = 0;

                    /**
                     * StringResult RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @instance
                     */
                    StringResult.prototype.RequestId = 0;

                    /**
                     * StringResult Value.
                     * @member {string} Value
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @instance
                     */
                    StringResult.prototype.Value = "";

                    /**
                     * Creates a new StringResult instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {Jde.Markets.Proto.Results.IStringResult=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.StringResult} StringResult instance
                     */
                    StringResult.create = function create(properties) {
                        return new StringResult(properties);
                    };

                    /**
                     * Encodes the specified StringResult message. Does not implicitly {@link Jde.Markets.Proto.Results.StringResult.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {Jde.Markets.Proto.Results.IStringResult} message StringResult message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    StringResult.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Type);
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RequestId);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.Value);
                        return writer;
                    };

                    /**
                     * Encodes the specified StringResult message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.StringResult.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {Jde.Markets.Proto.Results.IStringResult} message StringResult message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    StringResult.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a StringResult message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.StringResult} StringResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    StringResult.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.StringResult();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Type = reader.int32();
                                break;
                            case 2:
                                message.RequestId = reader.int32();
                                break;
                            case 3:
                                message.Value = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a StringResult message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.StringResult} StringResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    StringResult.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a StringResult message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    StringResult.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            switch (message.Type) {
                            default:
                                return "Type: enum value expected";
                            case 0:
                            case -1:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 45:
                            case 46:
                            case 47:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                            case 58:
                            case 59:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70:
                            case 71:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 80:
                            case 81:
                            case 82:
                            case 83:
                            case 84:
                            case 85:
                            case 86:
                            case 87:
                            case 88:
                            case 89:
                            case 90:
                            case 91:
                            case 92:
                            case 93:
                            case 94:
                            case 95:
                            case 96:
                            case 97:
                            case 98:
                            case 99:
                                break;
                            }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isString(message.Value))
                                return "Value: string expected";
                        return null;
                    };

                    /**
                     * Creates a StringResult message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.StringResult} StringResult
                     */
                    StringResult.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.StringResult)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.StringResult();
                        switch (object.Type) {
                        case "Accept":
                        case 0:
                            message.Type = 0;
                            break;
                        case "MultiEnd":
                        case -1:
                            message.Type = -1;
                            break;
                        case "TickPriceMessage":
                        case 1:
                            message.Type = 1;
                            break;
                        case "TickSizeMessage":
                        case 2:
                            message.Type = 2;
                            break;
                        case "OrderStatus":
                        case 3:
                            message.Type = 3;
                            break;
                        case "ErrorMessage":
                        case 4:
                            message.Type = 4;
                            break;
                        case "OpenOrder":
                        case 5:
                            message.Type = 5;
                            break;
                        case "ACCT_VALUE":
                        case 6:
                            message.Type = 6;
                            break;
                        case "PORTFOLIO_VALUE":
                        case 7:
                            message.Type = 7;
                            break;
                        case "ACCT_UPDATE_TIME":
                        case 8:
                            message.Type = 8;
                            break;
                        case "NextValidId":
                        case 9:
                            message.Type = 9;
                            break;
                        case "CONTRACT_DATA":
                        case 10:
                            message.Type = 10;
                            break;
                        case "ExecutionData":
                        case 11:
                            message.Type = 11;
                            break;
                        case "MARKET_DEPTH":
                        case 12:
                            message.Type = 12;
                            break;
                        case "MARKET_DEPTH_L2":
                        case 13:
                            message.Type = 13;
                            break;
                        case "NEWS_BULLETINS":
                        case 14:
                            message.Type = 14;
                            break;
                        case "ManagedAccounts":
                        case 15:
                            message.Type = 15;
                            break;
                        case "RECEIVE_FA":
                        case 16:
                            message.Type = 16;
                            break;
                        case "HistoricalData_":
                        case 17:
                            message.Type = 17;
                            break;
                        case "BOND_CONTRACT_DATA":
                        case 18:
                            message.Type = 18;
                            break;
                        case "SCANNER_PARAMETERS":
                        case 19:
                            message.Type = 19;
                            break;
                        case "SCANNER_DATA":
                        case 20:
                            message.Type = 20;
                            break;
                        case "TICK_OPTION_COMPUTATION":
                        case 21:
                            message.Type = 21;
                            break;
                        case "TickGenericMessage":
                        case 45:
                            message.Type = 45;
                            break;
                        case "TickStringMessage":
                        case 46:
                            message.Type = 46;
                            break;
                        case "TICK_EFP":
                        case 47:
                            message.Type = 47;
                            break;
                        case "CurrentTime":
                        case 49:
                            message.Type = 49;
                            break;
                        case "RealTimeBars":
                        case 50:
                            message.Type = 50;
                            break;
                        case "FUNDAMENTAL_DATA":
                        case 51:
                            message.Type = 51;
                            break;
                        case "ContractDataEnd":
                        case 52:
                            message.Type = 52;
                            break;
                        case "OPEN_ORDER_END":
                        case 53:
                            message.Type = 53;
                            break;
                        case "ACCT_DOWNLOAD_END":
                        case 54:
                            message.Type = 54;
                            break;
                        case "EXECUTION_DATA_END":
                        case 55:
                            message.Type = 55;
                            break;
                        case "DELTA_NEUTRAL_VALIDATION":
                        case 56:
                            message.Type = 56;
                            break;
                        case "TickSnapshotEnd":
                        case 57:
                            message.Type = 57;
                            break;
                        case "MarketDataType":
                        case 58:
                            message.Type = 58;
                            break;
                        case "COMMISSION_REPORT":
                        case 59:
                            message.Type = 59;
                            break;
                        case "PositionData":
                        case 61:
                            message.Type = 61;
                            break;
                        case "PositionEnd":
                        case 62:
                            message.Type = 62;
                            break;
                        case "ACCOUNT_SUMMARY":
                        case 63:
                            message.Type = 63;
                            break;
                        case "ACCOUNT_SUMMARY_END":
                        case 64:
                            message.Type = 64;
                            break;
                        case "VERIFY_MESSAGE_API":
                        case 65:
                            message.Type = 65;
                            break;
                        case "VERIFY_COMPLETED":
                        case 66:
                            message.Type = 66;
                            break;
                        case "DISPLAY_GROUP_LIST":
                        case 67:
                            message.Type = 67;
                            break;
                        case "DISPLAY_GROUP_UPDATED":
                        case 68:
                            message.Type = 68;
                            break;
                        case "VERIFY_AND_AUTH_MESSAGE_API":
                        case 69:
                            message.Type = 69;
                            break;
                        case "VERIFY_AND_AUTH_COMPLETED":
                        case 70:
                            message.Type = 70;
                            break;
                        case "PositionMulti":
                        case 71:
                            message.Type = 71;
                            break;
                        case "PositionMultiEnd":
                        case 72:
                            message.Type = 72;
                            break;
                        case "AccountUpdateMulti_":
                        case 73:
                            message.Type = 73;
                            break;
                        case "ACCOUNT_UPDATE_MULTI_END":
                        case 74:
                            message.Type = 74;
                            break;
                        case "SECURITY_DEFINITION_OPTION_PARAMETER":
                        case 75:
                            message.Type = 75;
                            break;
                        case "SECURITY_DEFINITION_OPTION_PARAMETER_END":
                        case 76:
                            message.Type = 76;
                            break;
                        case "SOFT_DOLLAR_TIERS":
                        case 77:
                            message.Type = 77;
                            break;
                        case "FAMILY_CODES":
                        case 78:
                            message.Type = 78;
                            break;
                        case "SYMBOL_SAMPLES":
                        case 79:
                            message.Type = 79;
                            break;
                        case "MKT_DEPTH_EXCHANGES":
                        case 80:
                            message.Type = 80;
                            break;
                        case "TickRequiredParams":
                        case 81:
                            message.Type = 81;
                            break;
                        case "SMART_COMPONENTS":
                        case 82:
                            message.Type = 82;
                            break;
                        case "NEWS_ARTICLE":
                        case 83:
                            message.Type = 83;
                            break;
                        case "TICK_NEWS":
                        case 84:
                            message.Type = 84;
                            break;
                        case "NEWS_PROVIDERS":
                        case 85:
                            message.Type = 85;
                            break;
                        case "HISTORICAL_NEWS":
                        case 86:
                            message.Type = 86;
                            break;
                        case "HISTORICAL_NEWS_END":
                        case 87:
                            message.Type = 87;
                            break;
                        case "HEAD_TIMESTAMP":
                        case 88:
                            message.Type = 88;
                            break;
                        case "HISTOGRAM_DATA":
                        case 89:
                            message.Type = 89;
                            break;
                        case "HISTORICAL_DATA_UPDATE":
                        case 90:
                            message.Type = 90;
                            break;
                        case "REROUTE_MKT_DATA_REQ":
                        case 91:
                            message.Type = 91;
                            break;
                        case "REROUTE_MKT_DEPTH_REQ":
                        case 92:
                            message.Type = 92;
                            break;
                        case "MARKET_RULE":
                        case 93:
                            message.Type = 93;
                            break;
                        case "PNL":
                        case 94:
                            message.Type = 94;
                            break;
                        case "PNL_SINGLE":
                        case 95:
                            message.Type = 95;
                            break;
                        case "HISTORICAL_TICKS":
                        case 96:
                            message.Type = 96;
                            break;
                        case "HISTORICAL_TICKS_BID_ASK":
                        case 97:
                            message.Type = 97;
                            break;
                        case "HISTORICAL_TICKS_LAST":
                        case 98:
                            message.Type = 98;
                            break;
                        case "TICK_BY_TICK":
                        case 99:
                            message.Type = 99;
                            break;
                        }
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.Value != null)
                            message.Value = String(object.Value);
                        return message;
                    };

                    /**
                     * Creates a plain object from a StringResult message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @static
                     * @param {Jde.Markets.Proto.Results.StringResult} message StringResult
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    StringResult.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Type = options.enums === String ? "Accept" : 0;
                            object.RequestId = 0;
                            object.Value = "";
                        }
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            object.Type = options.enums === String ? $root.Jde.Markets.Proto.Results.EResults[message.Type] : message.Type;
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        return object;
                    };

                    /**
                     * Converts this StringResult to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.StringResult
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    StringResult.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return StringResult;
                })();

                Results.TagValue = (function() {

                    /**
                     * Properties of a TagValue.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITagValue
                     * @property {string|null} [Tag] TagValue Tag
                     * @property {string|null} [Value] TagValue Value
                     */

                    /**
                     * Constructs a new TagValue.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a TagValue.
                     * @implements ITagValue
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITagValue=} [properties] Properties to set
                     */
                    function TagValue(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TagValue Tag.
                     * @member {string} Tag
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @instance
                     */
                    TagValue.prototype.Tag = "";

                    /**
                     * TagValue Value.
                     * @member {string} Value
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @instance
                     */
                    TagValue.prototype.Value = "";

                    /**
                     * Creates a new TagValue instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITagValue=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.TagValue} TagValue instance
                     */
                    TagValue.create = function create(properties) {
                        return new TagValue(properties);
                    };

                    /**
                     * Encodes the specified TagValue message. Does not implicitly {@link Jde.Markets.Proto.Results.TagValue.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITagValue} message TagValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TagValue.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Tag != null && message.hasOwnProperty("Tag"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.Tag);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Value);
                        return writer;
                    };

                    /**
                     * Encodes the specified TagValue message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TagValue.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITagValue} message TagValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TagValue.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TagValue message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.TagValue} TagValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TagValue.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.TagValue();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Tag = reader.string();
                                break;
                            case 2:
                                message.Value = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TagValue message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.TagValue} TagValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TagValue.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TagValue message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TagValue.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Tag != null && message.hasOwnProperty("Tag"))
                            if (!$util.isString(message.Tag))
                                return "Tag: string expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isString(message.Value))
                                return "Value: string expected";
                        return null;
                    };

                    /**
                     * Creates a TagValue message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.TagValue} TagValue
                     */
                    TagValue.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.TagValue)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.TagValue();
                        if (object.Tag != null)
                            message.Tag = String(object.Tag);
                        if (object.Value != null)
                            message.Value = String(object.Value);
                        return message;
                    };

                    /**
                     * Creates a plain object from a TagValue message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @static
                     * @param {Jde.Markets.Proto.Results.TagValue} message TagValue
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TagValue.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Tag = "";
                            object.Value = "";
                        }
                        if (message.Tag != null && message.hasOwnProperty("Tag"))
                            object.Tag = message.Tag;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        return object;
                    };

                    /**
                     * Converts this TagValue to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.TagValue
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TagValue.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return TagValue;
                })();

                Results.ContractDetails = (function() {

                    /**
                     * Properties of a ContractDetails.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IContractDetails
                     * @property {number|null} [RequestId] ContractDetails RequestId
                     * @property {Jde.Markets.Proto.IContract|null} [Contract] ContractDetails Contract
                     * @property {string|null} [MarketName] ContractDetails MarketName
                     * @property {number|null} [MinTick] ContractDetails MinTick
                     * @property {string|null} [OrderTypes] ContractDetails OrderTypes
                     * @property {string|null} [ValidExchanges] ContractDetails ValidExchanges
                     * @property {number|Long|null} [PriceMagnifier] ContractDetails PriceMagnifier
                     * @property {number|null} [UnderConId] ContractDetails UnderConId
                     * @property {string|null} [LongName] ContractDetails LongName
                     * @property {string|null} [ContractMonth] ContractDetails ContractMonth
                     * @property {string|null} [Industry] ContractDetails Industry
                     * @property {string|null} [Category] ContractDetails Category
                     * @property {string|null} [Subcategory] ContractDetails Subcategory
                     * @property {string|null} [TimeZoneId] ContractDetails TimeZoneId
                     * @property {string|null} [TradingHours] ContractDetails TradingHours
                     * @property {string|null} [LiquidHours] ContractDetails LiquidHours
                     * @property {string|null} [EvRule] ContractDetails EvRule
                     * @property {number|null} [EvMultiplier] ContractDetails EvMultiplier
                     * @property {number|null} [MdSizeMultiplier] ContractDetails MdSizeMultiplier
                     * @property {number|null} [AggGroup] ContractDetails AggGroup
                     * @property {string|null} [UnderSymbol] ContractDetails UnderSymbol
                     * @property {string|null} [UnderSecType] ContractDetails UnderSecType
                     * @property {string|null} [MarketRuleIds] ContractDetails MarketRuleIds
                     * @property {string|null} [RealExpirationDate] ContractDetails RealExpirationDate
                     * @property {string|null} [LastTradeTime] ContractDetails LastTradeTime
                     * @property {Array.<Jde.Markets.Proto.Results.ITagValue>|null} [secIdList] ContractDetails secIdList
                     * @property {string|null} [Cusip] ContractDetails Cusip
                     * @property {string|null} [Ratings] ContractDetails Ratings
                     * @property {string|null} [DescAppend] ContractDetails DescAppend
                     * @property {string|null} [BondType] ContractDetails BondType
                     * @property {string|null} [CouponType] ContractDetails CouponType
                     * @property {boolean|null} [Callable] ContractDetails Callable
                     * @property {boolean|null} [Putable] ContractDetails Putable
                     * @property {number|null} [Coupon] ContractDetails Coupon
                     * @property {boolean|null} [Convertible] ContractDetails Convertible
                     * @property {string|null} [Maturity] ContractDetails Maturity
                     * @property {string|null} [IssueDate] ContractDetails IssueDate
                     * @property {string|null} [NextOptionDate] ContractDetails NextOptionDate
                     * @property {string|null} [NextOptionType] ContractDetails NextOptionType
                     * @property {boolean|null} [NextOptionPartial] ContractDetails NextOptionPartial
                     * @property {string|null} [Notes] ContractDetails Notes
                     */

                    /**
                     * Constructs a new ContractDetails.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a ContractDetails.
                     * @implements IContractDetails
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IContractDetails=} [properties] Properties to set
                     */
                    function ContractDetails(properties) {
                        this.secIdList = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ContractDetails RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.RequestId = 0;

                    /**
                     * ContractDetails Contract.
                     * @member {Jde.Markets.Proto.IContract|null|undefined} Contract
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Contract = null;

                    /**
                     * ContractDetails MarketName.
                     * @member {string} MarketName
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.MarketName = "";

                    /**
                     * ContractDetails MinTick.
                     * @member {number} MinTick
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.MinTick = 0;

                    /**
                     * ContractDetails OrderTypes.
                     * @member {string} OrderTypes
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.OrderTypes = "";

                    /**
                     * ContractDetails ValidExchanges.
                     * @member {string} ValidExchanges
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.ValidExchanges = "";

                    /**
                     * ContractDetails PriceMagnifier.
                     * @member {number|Long} PriceMagnifier
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.PriceMagnifier = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * ContractDetails UnderConId.
                     * @member {number} UnderConId
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.UnderConId = 0;

                    /**
                     * ContractDetails LongName.
                     * @member {string} LongName
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.LongName = "";

                    /**
                     * ContractDetails ContractMonth.
                     * @member {string} ContractMonth
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.ContractMonth = "";

                    /**
                     * ContractDetails Industry.
                     * @member {string} Industry
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Industry = "";

                    /**
                     * ContractDetails Category.
                     * @member {string} Category
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Category = "";

                    /**
                     * ContractDetails Subcategory.
                     * @member {string} Subcategory
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Subcategory = "";

                    /**
                     * ContractDetails TimeZoneId.
                     * @member {string} TimeZoneId
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.TimeZoneId = "";

                    /**
                     * ContractDetails TradingHours.
                     * @member {string} TradingHours
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.TradingHours = "";

                    /**
                     * ContractDetails LiquidHours.
                     * @member {string} LiquidHours
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.LiquidHours = "";

                    /**
                     * ContractDetails EvRule.
                     * @member {string} EvRule
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.EvRule = "";

                    /**
                     * ContractDetails EvMultiplier.
                     * @member {number} EvMultiplier
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.EvMultiplier = 0;

                    /**
                     * ContractDetails MdSizeMultiplier.
                     * @member {number} MdSizeMultiplier
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.MdSizeMultiplier = 0;

                    /**
                     * ContractDetails AggGroup.
                     * @member {number} AggGroup
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.AggGroup = 0;

                    /**
                     * ContractDetails UnderSymbol.
                     * @member {string} UnderSymbol
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.UnderSymbol = "";

                    /**
                     * ContractDetails UnderSecType.
                     * @member {string} UnderSecType
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.UnderSecType = "";

                    /**
                     * ContractDetails MarketRuleIds.
                     * @member {string} MarketRuleIds
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.MarketRuleIds = "";

                    /**
                     * ContractDetails RealExpirationDate.
                     * @member {string} RealExpirationDate
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.RealExpirationDate = "";

                    /**
                     * ContractDetails LastTradeTime.
                     * @member {string} LastTradeTime
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.LastTradeTime = "";

                    /**
                     * ContractDetails secIdList.
                     * @member {Array.<Jde.Markets.Proto.Results.ITagValue>} secIdList
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.secIdList = $util.emptyArray;

                    /**
                     * ContractDetails Cusip.
                     * @member {string} Cusip
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Cusip = "";

                    /**
                     * ContractDetails Ratings.
                     * @member {string} Ratings
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Ratings = "";

                    /**
                     * ContractDetails DescAppend.
                     * @member {string} DescAppend
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.DescAppend = "";

                    /**
                     * ContractDetails BondType.
                     * @member {string} BondType
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.BondType = "";

                    /**
                     * ContractDetails CouponType.
                     * @member {string} CouponType
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.CouponType = "";

                    /**
                     * ContractDetails Callable.
                     * @member {boolean} Callable
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Callable = false;

                    /**
                     * ContractDetails Putable.
                     * @member {boolean} Putable
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Putable = false;

                    /**
                     * ContractDetails Coupon.
                     * @member {number} Coupon
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Coupon = 0;

                    /**
                     * ContractDetails Convertible.
                     * @member {boolean} Convertible
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Convertible = false;

                    /**
                     * ContractDetails Maturity.
                     * @member {string} Maturity
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Maturity = "";

                    /**
                     * ContractDetails IssueDate.
                     * @member {string} IssueDate
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.IssueDate = "";

                    /**
                     * ContractDetails NextOptionDate.
                     * @member {string} NextOptionDate
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.NextOptionDate = "";

                    /**
                     * ContractDetails NextOptionType.
                     * @member {string} NextOptionType
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.NextOptionType = "";

                    /**
                     * ContractDetails NextOptionPartial.
                     * @member {boolean} NextOptionPartial
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.NextOptionPartial = false;

                    /**
                     * ContractDetails Notes.
                     * @member {string} Notes
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     */
                    ContractDetails.prototype.Notes = "";

                    /**
                     * Creates a new ContractDetails instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Results.IContractDetails=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.ContractDetails} ContractDetails instance
                     */
                    ContractDetails.create = function create(properties) {
                        return new ContractDetails(properties);
                    };

                    /**
                     * Encodes the specified ContractDetails message. Does not implicitly {@link Jde.Markets.Proto.Results.ContractDetails.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Results.IContractDetails} message ContractDetails message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ContractDetails.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            $root.Jde.Markets.Proto.Contract.encode(message.Contract, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.MarketName != null && message.hasOwnProperty("MarketName"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.MarketName);
                        if (message.MinTick != null && message.hasOwnProperty("MinTick"))
                            writer.uint32(/* id 4, wireType 1 =*/33).double(message.MinTick);
                        if (message.OrderTypes != null && message.hasOwnProperty("OrderTypes"))
                            writer.uint32(/* id 5, wireType 2 =*/42).string(message.OrderTypes);
                        if (message.ValidExchanges != null && message.hasOwnProperty("ValidExchanges"))
                            writer.uint32(/* id 6, wireType 2 =*/50).string(message.ValidExchanges);
                        if (message.PriceMagnifier != null && message.hasOwnProperty("PriceMagnifier"))
                            writer.uint32(/* id 7, wireType 0 =*/56).int64(message.PriceMagnifier);
                        if (message.UnderConId != null && message.hasOwnProperty("UnderConId"))
                            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.UnderConId);
                        if (message.LongName != null && message.hasOwnProperty("LongName"))
                            writer.uint32(/* id 9, wireType 2 =*/74).string(message.LongName);
                        if (message.ContractMonth != null && message.hasOwnProperty("ContractMonth"))
                            writer.uint32(/* id 10, wireType 2 =*/82).string(message.ContractMonth);
                        if (message.Industry != null && message.hasOwnProperty("Industry"))
                            writer.uint32(/* id 11, wireType 2 =*/90).string(message.Industry);
                        if (message.Category != null && message.hasOwnProperty("Category"))
                            writer.uint32(/* id 12, wireType 2 =*/98).string(message.Category);
                        if (message.Subcategory != null && message.hasOwnProperty("Subcategory"))
                            writer.uint32(/* id 13, wireType 2 =*/106).string(message.Subcategory);
                        if (message.TimeZoneId != null && message.hasOwnProperty("TimeZoneId"))
                            writer.uint32(/* id 14, wireType 2 =*/114).string(message.TimeZoneId);
                        if (message.TradingHours != null && message.hasOwnProperty("TradingHours"))
                            writer.uint32(/* id 15, wireType 2 =*/122).string(message.TradingHours);
                        if (message.LiquidHours != null && message.hasOwnProperty("LiquidHours"))
                            writer.uint32(/* id 16, wireType 2 =*/130).string(message.LiquidHours);
                        if (message.EvRule != null && message.hasOwnProperty("EvRule"))
                            writer.uint32(/* id 17, wireType 2 =*/138).string(message.EvRule);
                        if (message.EvMultiplier != null && message.hasOwnProperty("EvMultiplier"))
                            writer.uint32(/* id 18, wireType 1 =*/145).double(message.EvMultiplier);
                        if (message.MdSizeMultiplier != null && message.hasOwnProperty("MdSizeMultiplier"))
                            writer.uint32(/* id 19, wireType 0 =*/152).int32(message.MdSizeMultiplier);
                        if (message.AggGroup != null && message.hasOwnProperty("AggGroup"))
                            writer.uint32(/* id 20, wireType 0 =*/160).int32(message.AggGroup);
                        if (message.UnderSymbol != null && message.hasOwnProperty("UnderSymbol"))
                            writer.uint32(/* id 21, wireType 2 =*/170).string(message.UnderSymbol);
                        if (message.UnderSecType != null && message.hasOwnProperty("UnderSecType"))
                            writer.uint32(/* id 22, wireType 2 =*/178).string(message.UnderSecType);
                        if (message.MarketRuleIds != null && message.hasOwnProperty("MarketRuleIds"))
                            writer.uint32(/* id 23, wireType 2 =*/186).string(message.MarketRuleIds);
                        if (message.RealExpirationDate != null && message.hasOwnProperty("RealExpirationDate"))
                            writer.uint32(/* id 24, wireType 2 =*/194).string(message.RealExpirationDate);
                        if (message.LastTradeTime != null && message.hasOwnProperty("LastTradeTime"))
                            writer.uint32(/* id 25, wireType 2 =*/202).string(message.LastTradeTime);
                        if (message.secIdList != null && message.secIdList.length)
                            for (let i = 0; i < message.secIdList.length; ++i)
                                $root.Jde.Markets.Proto.Results.TagValue.encode(message.secIdList[i], writer.uint32(/* id 26, wireType 2 =*/210).fork()).ldelim();
                        if (message.Cusip != null && message.hasOwnProperty("Cusip"))
                            writer.uint32(/* id 27, wireType 2 =*/218).string(message.Cusip);
                        if (message.Ratings != null && message.hasOwnProperty("Ratings"))
                            writer.uint32(/* id 28, wireType 2 =*/226).string(message.Ratings);
                        if (message.DescAppend != null && message.hasOwnProperty("DescAppend"))
                            writer.uint32(/* id 29, wireType 2 =*/234).string(message.DescAppend);
                        if (message.BondType != null && message.hasOwnProperty("BondType"))
                            writer.uint32(/* id 30, wireType 2 =*/242).string(message.BondType);
                        if (message.CouponType != null && message.hasOwnProperty("CouponType"))
                            writer.uint32(/* id 31, wireType 2 =*/250).string(message.CouponType);
                        if (message.Callable != null && message.hasOwnProperty("Callable"))
                            writer.uint32(/* id 32, wireType 0 =*/256).bool(message.Callable);
                        if (message.Putable != null && message.hasOwnProperty("Putable"))
                            writer.uint32(/* id 33, wireType 0 =*/264).bool(message.Putable);
                        if (message.Coupon != null && message.hasOwnProperty("Coupon"))
                            writer.uint32(/* id 34, wireType 1 =*/273).double(message.Coupon);
                        if (message.Convertible != null && message.hasOwnProperty("Convertible"))
                            writer.uint32(/* id 35, wireType 0 =*/280).bool(message.Convertible);
                        if (message.Maturity != null && message.hasOwnProperty("Maturity"))
                            writer.uint32(/* id 36, wireType 2 =*/290).string(message.Maturity);
                        if (message.IssueDate != null && message.hasOwnProperty("IssueDate"))
                            writer.uint32(/* id 37, wireType 2 =*/298).string(message.IssueDate);
                        if (message.NextOptionDate != null && message.hasOwnProperty("NextOptionDate"))
                            writer.uint32(/* id 38, wireType 2 =*/306).string(message.NextOptionDate);
                        if (message.NextOptionType != null && message.hasOwnProperty("NextOptionType"))
                            writer.uint32(/* id 39, wireType 2 =*/314).string(message.NextOptionType);
                        if (message.NextOptionPartial != null && message.hasOwnProperty("NextOptionPartial"))
                            writer.uint32(/* id 40, wireType 0 =*/320).bool(message.NextOptionPartial);
                        if (message.Notes != null && message.hasOwnProperty("Notes"))
                            writer.uint32(/* id 41, wireType 2 =*/330).string(message.Notes);
                        return writer;
                    };

                    /**
                     * Encodes the specified ContractDetails message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.ContractDetails.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Results.IContractDetails} message ContractDetails message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ContractDetails.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ContractDetails message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.ContractDetails} ContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ContractDetails.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.ContractDetails();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.Contract = $root.Jde.Markets.Proto.Contract.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.MarketName = reader.string();
                                break;
                            case 4:
                                message.MinTick = reader.double();
                                break;
                            case 5:
                                message.OrderTypes = reader.string();
                                break;
                            case 6:
                                message.ValidExchanges = reader.string();
                                break;
                            case 7:
                                message.PriceMagnifier = reader.int64();
                                break;
                            case 8:
                                message.UnderConId = reader.uint32();
                                break;
                            case 9:
                                message.LongName = reader.string();
                                break;
                            case 10:
                                message.ContractMonth = reader.string();
                                break;
                            case 11:
                                message.Industry = reader.string();
                                break;
                            case 12:
                                message.Category = reader.string();
                                break;
                            case 13:
                                message.Subcategory = reader.string();
                                break;
                            case 14:
                                message.TimeZoneId = reader.string();
                                break;
                            case 15:
                                message.TradingHours = reader.string();
                                break;
                            case 16:
                                message.LiquidHours = reader.string();
                                break;
                            case 17:
                                message.EvRule = reader.string();
                                break;
                            case 18:
                                message.EvMultiplier = reader.double();
                                break;
                            case 19:
                                message.MdSizeMultiplier = reader.int32();
                                break;
                            case 20:
                                message.AggGroup = reader.int32();
                                break;
                            case 21:
                                message.UnderSymbol = reader.string();
                                break;
                            case 22:
                                message.UnderSecType = reader.string();
                                break;
                            case 23:
                                message.MarketRuleIds = reader.string();
                                break;
                            case 24:
                                message.RealExpirationDate = reader.string();
                                break;
                            case 25:
                                message.LastTradeTime = reader.string();
                                break;
                            case 26:
                                if (!(message.secIdList && message.secIdList.length))
                                    message.secIdList = [];
                                message.secIdList.push($root.Jde.Markets.Proto.Results.TagValue.decode(reader, reader.uint32()));
                                break;
                            case 27:
                                message.Cusip = reader.string();
                                break;
                            case 28:
                                message.Ratings = reader.string();
                                break;
                            case 29:
                                message.DescAppend = reader.string();
                                break;
                            case 30:
                                message.BondType = reader.string();
                                break;
                            case 31:
                                message.CouponType = reader.string();
                                break;
                            case 32:
                                message.Callable = reader.bool();
                                break;
                            case 33:
                                message.Putable = reader.bool();
                                break;
                            case 34:
                                message.Coupon = reader.double();
                                break;
                            case 35:
                                message.Convertible = reader.bool();
                                break;
                            case 36:
                                message.Maturity = reader.string();
                                break;
                            case 37:
                                message.IssueDate = reader.string();
                                break;
                            case 38:
                                message.NextOptionDate = reader.string();
                                break;
                            case 39:
                                message.NextOptionType = reader.string();
                                break;
                            case 40:
                                message.NextOptionPartial = reader.bool();
                                break;
                            case 41:
                                message.Notes = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ContractDetails message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.ContractDetails} ContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ContractDetails.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ContractDetails message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ContractDetails.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Contract != null && message.hasOwnProperty("Contract")) {
                            let error = $root.Jde.Markets.Proto.Contract.verify(message.Contract);
                            if (error)
                                return "Contract." + error;
                        }
                        if (message.MarketName != null && message.hasOwnProperty("MarketName"))
                            if (!$util.isString(message.MarketName))
                                return "MarketName: string expected";
                        if (message.MinTick != null && message.hasOwnProperty("MinTick"))
                            if (typeof message.MinTick !== "number")
                                return "MinTick: number expected";
                        if (message.OrderTypes != null && message.hasOwnProperty("OrderTypes"))
                            if (!$util.isString(message.OrderTypes))
                                return "OrderTypes: string expected";
                        if (message.ValidExchanges != null && message.hasOwnProperty("ValidExchanges"))
                            if (!$util.isString(message.ValidExchanges))
                                return "ValidExchanges: string expected";
                        if (message.PriceMagnifier != null && message.hasOwnProperty("PriceMagnifier"))
                            if (!$util.isInteger(message.PriceMagnifier) && !(message.PriceMagnifier && $util.isInteger(message.PriceMagnifier.low) && $util.isInteger(message.PriceMagnifier.high)))
                                return "PriceMagnifier: integer|Long expected";
                        if (message.UnderConId != null && message.hasOwnProperty("UnderConId"))
                            if (!$util.isInteger(message.UnderConId))
                                return "UnderConId: integer expected";
                        if (message.LongName != null && message.hasOwnProperty("LongName"))
                            if (!$util.isString(message.LongName))
                                return "LongName: string expected";
                        if (message.ContractMonth != null && message.hasOwnProperty("ContractMonth"))
                            if (!$util.isString(message.ContractMonth))
                                return "ContractMonth: string expected";
                        if (message.Industry != null && message.hasOwnProperty("Industry"))
                            if (!$util.isString(message.Industry))
                                return "Industry: string expected";
                        if (message.Category != null && message.hasOwnProperty("Category"))
                            if (!$util.isString(message.Category))
                                return "Category: string expected";
                        if (message.Subcategory != null && message.hasOwnProperty("Subcategory"))
                            if (!$util.isString(message.Subcategory))
                                return "Subcategory: string expected";
                        if (message.TimeZoneId != null && message.hasOwnProperty("TimeZoneId"))
                            if (!$util.isString(message.TimeZoneId))
                                return "TimeZoneId: string expected";
                        if (message.TradingHours != null && message.hasOwnProperty("TradingHours"))
                            if (!$util.isString(message.TradingHours))
                                return "TradingHours: string expected";
                        if (message.LiquidHours != null && message.hasOwnProperty("LiquidHours"))
                            if (!$util.isString(message.LiquidHours))
                                return "LiquidHours: string expected";
                        if (message.EvRule != null && message.hasOwnProperty("EvRule"))
                            if (!$util.isString(message.EvRule))
                                return "EvRule: string expected";
                        if (message.EvMultiplier != null && message.hasOwnProperty("EvMultiplier"))
                            if (typeof message.EvMultiplier !== "number")
                                return "EvMultiplier: number expected";
                        if (message.MdSizeMultiplier != null && message.hasOwnProperty("MdSizeMultiplier"))
                            if (!$util.isInteger(message.MdSizeMultiplier))
                                return "MdSizeMultiplier: integer expected";
                        if (message.AggGroup != null && message.hasOwnProperty("AggGroup"))
                            if (!$util.isInteger(message.AggGroup))
                                return "AggGroup: integer expected";
                        if (message.UnderSymbol != null && message.hasOwnProperty("UnderSymbol"))
                            if (!$util.isString(message.UnderSymbol))
                                return "UnderSymbol: string expected";
                        if (message.UnderSecType != null && message.hasOwnProperty("UnderSecType"))
                            if (!$util.isString(message.UnderSecType))
                                return "UnderSecType: string expected";
                        if (message.MarketRuleIds != null && message.hasOwnProperty("MarketRuleIds"))
                            if (!$util.isString(message.MarketRuleIds))
                                return "MarketRuleIds: string expected";
                        if (message.RealExpirationDate != null && message.hasOwnProperty("RealExpirationDate"))
                            if (!$util.isString(message.RealExpirationDate))
                                return "RealExpirationDate: string expected";
                        if (message.LastTradeTime != null && message.hasOwnProperty("LastTradeTime"))
                            if (!$util.isString(message.LastTradeTime))
                                return "LastTradeTime: string expected";
                        if (message.secIdList != null && message.hasOwnProperty("secIdList")) {
                            if (!Array.isArray(message.secIdList))
                                return "secIdList: array expected";
                            for (let i = 0; i < message.secIdList.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Results.TagValue.verify(message.secIdList[i]);
                                if (error)
                                    return "secIdList." + error;
                            }
                        }
                        if (message.Cusip != null && message.hasOwnProperty("Cusip"))
                            if (!$util.isString(message.Cusip))
                                return "Cusip: string expected";
                        if (message.Ratings != null && message.hasOwnProperty("Ratings"))
                            if (!$util.isString(message.Ratings))
                                return "Ratings: string expected";
                        if (message.DescAppend != null && message.hasOwnProperty("DescAppend"))
                            if (!$util.isString(message.DescAppend))
                                return "DescAppend: string expected";
                        if (message.BondType != null && message.hasOwnProperty("BondType"))
                            if (!$util.isString(message.BondType))
                                return "BondType: string expected";
                        if (message.CouponType != null && message.hasOwnProperty("CouponType"))
                            if (!$util.isString(message.CouponType))
                                return "CouponType: string expected";
                        if (message.Callable != null && message.hasOwnProperty("Callable"))
                            if (typeof message.Callable !== "boolean")
                                return "Callable: boolean expected";
                        if (message.Putable != null && message.hasOwnProperty("Putable"))
                            if (typeof message.Putable !== "boolean")
                                return "Putable: boolean expected";
                        if (message.Coupon != null && message.hasOwnProperty("Coupon"))
                            if (typeof message.Coupon !== "number")
                                return "Coupon: number expected";
                        if (message.Convertible != null && message.hasOwnProperty("Convertible"))
                            if (typeof message.Convertible !== "boolean")
                                return "Convertible: boolean expected";
                        if (message.Maturity != null && message.hasOwnProperty("Maturity"))
                            if (!$util.isString(message.Maturity))
                                return "Maturity: string expected";
                        if (message.IssueDate != null && message.hasOwnProperty("IssueDate"))
                            if (!$util.isString(message.IssueDate))
                                return "IssueDate: string expected";
                        if (message.NextOptionDate != null && message.hasOwnProperty("NextOptionDate"))
                            if (!$util.isString(message.NextOptionDate))
                                return "NextOptionDate: string expected";
                        if (message.NextOptionType != null && message.hasOwnProperty("NextOptionType"))
                            if (!$util.isString(message.NextOptionType))
                                return "NextOptionType: string expected";
                        if (message.NextOptionPartial != null && message.hasOwnProperty("NextOptionPartial"))
                            if (typeof message.NextOptionPartial !== "boolean")
                                return "NextOptionPartial: boolean expected";
                        if (message.Notes != null && message.hasOwnProperty("Notes"))
                            if (!$util.isString(message.Notes))
                                return "Notes: string expected";
                        return null;
                    };

                    /**
                     * Creates a ContractDetails message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.ContractDetails} ContractDetails
                     */
                    ContractDetails.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.ContractDetails)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.ContractDetails();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.Contract != null) {
                            if (typeof object.Contract !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.ContractDetails.Contract: object expected");
                            message.Contract = $root.Jde.Markets.Proto.Contract.fromObject(object.Contract);
                        }
                        if (object.MarketName != null)
                            message.MarketName = String(object.MarketName);
                        if (object.MinTick != null)
                            message.MinTick = Number(object.MinTick);
                        if (object.OrderTypes != null)
                            message.OrderTypes = String(object.OrderTypes);
                        if (object.ValidExchanges != null)
                            message.ValidExchanges = String(object.ValidExchanges);
                        if (object.PriceMagnifier != null)
                            if ($util.Long)
                                (message.PriceMagnifier = $util.Long.fromValue(object.PriceMagnifier)).unsigned = false;
                            else if (typeof object.PriceMagnifier === "string")
                                message.PriceMagnifier = parseInt(object.PriceMagnifier, 10);
                            else if (typeof object.PriceMagnifier === "number")
                                message.PriceMagnifier = object.PriceMagnifier;
                            else if (typeof object.PriceMagnifier === "object")
                                message.PriceMagnifier = new $util.LongBits(object.PriceMagnifier.low >>> 0, object.PriceMagnifier.high >>> 0).toNumber();
                        if (object.UnderConId != null)
                            message.UnderConId = object.UnderConId >>> 0;
                        if (object.LongName != null)
                            message.LongName = String(object.LongName);
                        if (object.ContractMonth != null)
                            message.ContractMonth = String(object.ContractMonth);
                        if (object.Industry != null)
                            message.Industry = String(object.Industry);
                        if (object.Category != null)
                            message.Category = String(object.Category);
                        if (object.Subcategory != null)
                            message.Subcategory = String(object.Subcategory);
                        if (object.TimeZoneId != null)
                            message.TimeZoneId = String(object.TimeZoneId);
                        if (object.TradingHours != null)
                            message.TradingHours = String(object.TradingHours);
                        if (object.LiquidHours != null)
                            message.LiquidHours = String(object.LiquidHours);
                        if (object.EvRule != null)
                            message.EvRule = String(object.EvRule);
                        if (object.EvMultiplier != null)
                            message.EvMultiplier = Number(object.EvMultiplier);
                        if (object.MdSizeMultiplier != null)
                            message.MdSizeMultiplier = object.MdSizeMultiplier | 0;
                        if (object.AggGroup != null)
                            message.AggGroup = object.AggGroup | 0;
                        if (object.UnderSymbol != null)
                            message.UnderSymbol = String(object.UnderSymbol);
                        if (object.UnderSecType != null)
                            message.UnderSecType = String(object.UnderSecType);
                        if (object.MarketRuleIds != null)
                            message.MarketRuleIds = String(object.MarketRuleIds);
                        if (object.RealExpirationDate != null)
                            message.RealExpirationDate = String(object.RealExpirationDate);
                        if (object.LastTradeTime != null)
                            message.LastTradeTime = String(object.LastTradeTime);
                        if (object.secIdList) {
                            if (!Array.isArray(object.secIdList))
                                throw TypeError(".Jde.Markets.Proto.Results.ContractDetails.secIdList: array expected");
                            message.secIdList = [];
                            for (let i = 0; i < object.secIdList.length; ++i) {
                                if (typeof object.secIdList[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Results.ContractDetails.secIdList: object expected");
                                message.secIdList[i] = $root.Jde.Markets.Proto.Results.TagValue.fromObject(object.secIdList[i]);
                            }
                        }
                        if (object.Cusip != null)
                            message.Cusip = String(object.Cusip);
                        if (object.Ratings != null)
                            message.Ratings = String(object.Ratings);
                        if (object.DescAppend != null)
                            message.DescAppend = String(object.DescAppend);
                        if (object.BondType != null)
                            message.BondType = String(object.BondType);
                        if (object.CouponType != null)
                            message.CouponType = String(object.CouponType);
                        if (object.Callable != null)
                            message.Callable = Boolean(object.Callable);
                        if (object.Putable != null)
                            message.Putable = Boolean(object.Putable);
                        if (object.Coupon != null)
                            message.Coupon = Number(object.Coupon);
                        if (object.Convertible != null)
                            message.Convertible = Boolean(object.Convertible);
                        if (object.Maturity != null)
                            message.Maturity = String(object.Maturity);
                        if (object.IssueDate != null)
                            message.IssueDate = String(object.IssueDate);
                        if (object.NextOptionDate != null)
                            message.NextOptionDate = String(object.NextOptionDate);
                        if (object.NextOptionType != null)
                            message.NextOptionType = String(object.NextOptionType);
                        if (object.NextOptionPartial != null)
                            message.NextOptionPartial = Boolean(object.NextOptionPartial);
                        if (object.Notes != null)
                            message.Notes = String(object.Notes);
                        return message;
                    };

                    /**
                     * Creates a plain object from a ContractDetails message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Results.ContractDetails} message ContractDetails
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ContractDetails.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.secIdList = [];
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.Contract = null;
                            object.MarketName = "";
                            object.MinTick = 0;
                            object.OrderTypes = "";
                            object.ValidExchanges = "";
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, false);
                                object.PriceMagnifier = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.PriceMagnifier = options.longs === String ? "0" : 0;
                            object.UnderConId = 0;
                            object.LongName = "";
                            object.ContractMonth = "";
                            object.Industry = "";
                            object.Category = "";
                            object.Subcategory = "";
                            object.TimeZoneId = "";
                            object.TradingHours = "";
                            object.LiquidHours = "";
                            object.EvRule = "";
                            object.EvMultiplier = 0;
                            object.MdSizeMultiplier = 0;
                            object.AggGroup = 0;
                            object.UnderSymbol = "";
                            object.UnderSecType = "";
                            object.MarketRuleIds = "";
                            object.RealExpirationDate = "";
                            object.LastTradeTime = "";
                            object.Cusip = "";
                            object.Ratings = "";
                            object.DescAppend = "";
                            object.BondType = "";
                            object.CouponType = "";
                            object.Callable = false;
                            object.Putable = false;
                            object.Coupon = 0;
                            object.Convertible = false;
                            object.Maturity = "";
                            object.IssueDate = "";
                            object.NextOptionDate = "";
                            object.NextOptionType = "";
                            object.NextOptionPartial = false;
                            object.Notes = "";
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            object.Contract = $root.Jde.Markets.Proto.Contract.toObject(message.Contract, options);
                        if (message.MarketName != null && message.hasOwnProperty("MarketName"))
                            object.MarketName = message.MarketName;
                        if (message.MinTick != null && message.hasOwnProperty("MinTick"))
                            object.MinTick = options.json && !isFinite(message.MinTick) ? String(message.MinTick) : message.MinTick;
                        if (message.OrderTypes != null && message.hasOwnProperty("OrderTypes"))
                            object.OrderTypes = message.OrderTypes;
                        if (message.ValidExchanges != null && message.hasOwnProperty("ValidExchanges"))
                            object.ValidExchanges = message.ValidExchanges;
                        if (message.PriceMagnifier != null && message.hasOwnProperty("PriceMagnifier"))
                            if (typeof message.PriceMagnifier === "number")
                                object.PriceMagnifier = options.longs === String ? String(message.PriceMagnifier) : message.PriceMagnifier;
                            else
                                object.PriceMagnifier = options.longs === String ? $util.Long.prototype.toString.call(message.PriceMagnifier) : options.longs === Number ? new $util.LongBits(message.PriceMagnifier.low >>> 0, message.PriceMagnifier.high >>> 0).toNumber() : message.PriceMagnifier;
                        if (message.UnderConId != null && message.hasOwnProperty("UnderConId"))
                            object.UnderConId = message.UnderConId;
                        if (message.LongName != null && message.hasOwnProperty("LongName"))
                            object.LongName = message.LongName;
                        if (message.ContractMonth != null && message.hasOwnProperty("ContractMonth"))
                            object.ContractMonth = message.ContractMonth;
                        if (message.Industry != null && message.hasOwnProperty("Industry"))
                            object.Industry = message.Industry;
                        if (message.Category != null && message.hasOwnProperty("Category"))
                            object.Category = message.Category;
                        if (message.Subcategory != null && message.hasOwnProperty("Subcategory"))
                            object.Subcategory = message.Subcategory;
                        if (message.TimeZoneId != null && message.hasOwnProperty("TimeZoneId"))
                            object.TimeZoneId = message.TimeZoneId;
                        if (message.TradingHours != null && message.hasOwnProperty("TradingHours"))
                            object.TradingHours = message.TradingHours;
                        if (message.LiquidHours != null && message.hasOwnProperty("LiquidHours"))
                            object.LiquidHours = message.LiquidHours;
                        if (message.EvRule != null && message.hasOwnProperty("EvRule"))
                            object.EvRule = message.EvRule;
                        if (message.EvMultiplier != null && message.hasOwnProperty("EvMultiplier"))
                            object.EvMultiplier = options.json && !isFinite(message.EvMultiplier) ? String(message.EvMultiplier) : message.EvMultiplier;
                        if (message.MdSizeMultiplier != null && message.hasOwnProperty("MdSizeMultiplier"))
                            object.MdSizeMultiplier = message.MdSizeMultiplier;
                        if (message.AggGroup != null && message.hasOwnProperty("AggGroup"))
                            object.AggGroup = message.AggGroup;
                        if (message.UnderSymbol != null && message.hasOwnProperty("UnderSymbol"))
                            object.UnderSymbol = message.UnderSymbol;
                        if (message.UnderSecType != null && message.hasOwnProperty("UnderSecType"))
                            object.UnderSecType = message.UnderSecType;
                        if (message.MarketRuleIds != null && message.hasOwnProperty("MarketRuleIds"))
                            object.MarketRuleIds = message.MarketRuleIds;
                        if (message.RealExpirationDate != null && message.hasOwnProperty("RealExpirationDate"))
                            object.RealExpirationDate = message.RealExpirationDate;
                        if (message.LastTradeTime != null && message.hasOwnProperty("LastTradeTime"))
                            object.LastTradeTime = message.LastTradeTime;
                        if (message.secIdList && message.secIdList.length) {
                            object.secIdList = [];
                            for (let j = 0; j < message.secIdList.length; ++j)
                                object.secIdList[j] = $root.Jde.Markets.Proto.Results.TagValue.toObject(message.secIdList[j], options);
                        }
                        if (message.Cusip != null && message.hasOwnProperty("Cusip"))
                            object.Cusip = message.Cusip;
                        if (message.Ratings != null && message.hasOwnProperty("Ratings"))
                            object.Ratings = message.Ratings;
                        if (message.DescAppend != null && message.hasOwnProperty("DescAppend"))
                            object.DescAppend = message.DescAppend;
                        if (message.BondType != null && message.hasOwnProperty("BondType"))
                            object.BondType = message.BondType;
                        if (message.CouponType != null && message.hasOwnProperty("CouponType"))
                            object.CouponType = message.CouponType;
                        if (message.Callable != null && message.hasOwnProperty("Callable"))
                            object.Callable = message.Callable;
                        if (message.Putable != null && message.hasOwnProperty("Putable"))
                            object.Putable = message.Putable;
                        if (message.Coupon != null && message.hasOwnProperty("Coupon"))
                            object.Coupon = options.json && !isFinite(message.Coupon) ? String(message.Coupon) : message.Coupon;
                        if (message.Convertible != null && message.hasOwnProperty("Convertible"))
                            object.Convertible = message.Convertible;
                        if (message.Maturity != null && message.hasOwnProperty("Maturity"))
                            object.Maturity = message.Maturity;
                        if (message.IssueDate != null && message.hasOwnProperty("IssueDate"))
                            object.IssueDate = message.IssueDate;
                        if (message.NextOptionDate != null && message.hasOwnProperty("NextOptionDate"))
                            object.NextOptionDate = message.NextOptionDate;
                        if (message.NextOptionType != null && message.hasOwnProperty("NextOptionType"))
                            object.NextOptionType = message.NextOptionType;
                        if (message.NextOptionPartial != null && message.hasOwnProperty("NextOptionPartial"))
                            object.NextOptionPartial = message.NextOptionPartial;
                        if (message.Notes != null && message.hasOwnProperty("Notes"))
                            object.Notes = message.Notes;
                        return object;
                    };

                    /**
                     * Converts this ContractDetails to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.ContractDetails
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ContractDetails.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return ContractDetails;
                })();

                Results.Position = (function() {

                    /**
                     * Properties of a Position.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IPosition
                     * @property {string|null} [AccountNumber] Position AccountNumber
                     * @property {Jde.Markets.Proto.IContract|null} [Contract] Position Contract
                     * @property {number|null} [Size] Position Size
                     * @property {number|null} [AvgCost] Position AvgCost
                     */

                    /**
                     * Constructs a new Position.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a Position.
                     * @implements IPosition
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IPosition=} [properties] Properties to set
                     */
                    function Position(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Position AccountNumber.
                     * @member {string} AccountNumber
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @instance
                     */
                    Position.prototype.AccountNumber = "";

                    /**
                     * Position Contract.
                     * @member {Jde.Markets.Proto.IContract|null|undefined} Contract
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @instance
                     */
                    Position.prototype.Contract = null;

                    /**
                     * Position Size.
                     * @member {number} Size
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @instance
                     */
                    Position.prototype.Size = 0;

                    /**
                     * Position AvgCost.
                     * @member {number} AvgCost
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @instance
                     */
                    Position.prototype.AvgCost = 0;

                    /**
                     * Creates a new Position instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {Jde.Markets.Proto.Results.IPosition=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Position} Position instance
                     */
                    Position.create = function create(properties) {
                        return new Position(properties);
                    };

                    /**
                     * Encodes the specified Position message. Does not implicitly {@link Jde.Markets.Proto.Results.Position.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {Jde.Markets.Proto.Results.IPosition} message Position message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Position.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.AccountNumber);
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            $root.Jde.Markets.Proto.Contract.encode(message.Contract, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.Size != null && message.hasOwnProperty("Size"))
                            writer.uint32(/* id 3, wireType 1 =*/25).double(message.Size);
                        if (message.AvgCost != null && message.hasOwnProperty("AvgCost"))
                            writer.uint32(/* id 4, wireType 1 =*/33).double(message.AvgCost);
                        return writer;
                    };

                    /**
                     * Encodes the specified Position message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Position.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {Jde.Markets.Proto.Results.IPosition} message Position message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Position.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Position message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Position} Position
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Position.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Position();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.AccountNumber = reader.string();
                                break;
                            case 2:
                                message.Contract = $root.Jde.Markets.Proto.Contract.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.Size = reader.double();
                                break;
                            case 4:
                                message.AvgCost = reader.double();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Position message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Position} Position
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Position.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Position message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Position.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            if (!$util.isString(message.AccountNumber))
                                return "AccountNumber: string expected";
                        if (message.Contract != null && message.hasOwnProperty("Contract")) {
                            let error = $root.Jde.Markets.Proto.Contract.verify(message.Contract);
                            if (error)
                                return "Contract." + error;
                        }
                        if (message.Size != null && message.hasOwnProperty("Size"))
                            if (typeof message.Size !== "number")
                                return "Size: number expected";
                        if (message.AvgCost != null && message.hasOwnProperty("AvgCost"))
                            if (typeof message.AvgCost !== "number")
                                return "AvgCost: number expected";
                        return null;
                    };

                    /**
                     * Creates a Position message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Position} Position
                     */
                    Position.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Position)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Position();
                        if (object.AccountNumber != null)
                            message.AccountNumber = String(object.AccountNumber);
                        if (object.Contract != null) {
                            if (typeof object.Contract !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.Position.Contract: object expected");
                            message.Contract = $root.Jde.Markets.Proto.Contract.fromObject(object.Contract);
                        }
                        if (object.Size != null)
                            message.Size = Number(object.Size);
                        if (object.AvgCost != null)
                            message.AvgCost = Number(object.AvgCost);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Position message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @static
                     * @param {Jde.Markets.Proto.Results.Position} message Position
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Position.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.AccountNumber = "";
                            object.Contract = null;
                            object.Size = 0;
                            object.AvgCost = 0;
                        }
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            object.AccountNumber = message.AccountNumber;
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            object.Contract = $root.Jde.Markets.Proto.Contract.toObject(message.Contract, options);
                        if (message.Size != null && message.hasOwnProperty("Size"))
                            object.Size = options.json && !isFinite(message.Size) ? String(message.Size) : message.Size;
                        if (message.AvgCost != null && message.hasOwnProperty("AvgCost"))
                            object.AvgCost = options.json && !isFinite(message.AvgCost) ? String(message.AvgCost) : message.AvgCost;
                        return object;
                    };

                    /**
                     * Converts this Position to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Position
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Position.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Position;
                })();

                Results.AccountList = (function() {

                    /**
                     * Properties of an AccountList.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IAccountList
                     * @property {Array.<string>|null} [Numbers] AccountList Numbers
                     */

                    /**
                     * Constructs a new AccountList.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an AccountList.
                     * @implements IAccountList
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IAccountList=} [properties] Properties to set
                     */
                    function AccountList(properties) {
                        this.Numbers = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * AccountList Numbers.
                     * @member {Array.<string>} Numbers
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @instance
                     */
                    AccountList.prototype.Numbers = $util.emptyArray;

                    /**
                     * Creates a new AccountList instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountList=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.AccountList} AccountList instance
                     */
                    AccountList.create = function create(properties) {
                        return new AccountList(properties);
                    };

                    /**
                     * Encodes the specified AccountList message. Does not implicitly {@link Jde.Markets.Proto.Results.AccountList.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountList} message AccountList message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccountList.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Numbers != null && message.Numbers.length)
                            for (let i = 0; i < message.Numbers.length; ++i)
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Numbers[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified AccountList message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.AccountList.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountList} message AccountList message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccountList.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an AccountList message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.AccountList} AccountList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccountList.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.AccountList();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.Numbers && message.Numbers.length))
                                    message.Numbers = [];
                                message.Numbers.push(reader.string());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an AccountList message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.AccountList} AccountList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccountList.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an AccountList message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    AccountList.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Numbers != null && message.hasOwnProperty("Numbers")) {
                            if (!Array.isArray(message.Numbers))
                                return "Numbers: array expected";
                            for (let i = 0; i < message.Numbers.length; ++i)
                                if (!$util.isString(message.Numbers[i]))
                                    return "Numbers: string[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates an AccountList message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.AccountList} AccountList
                     */
                    AccountList.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.AccountList)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.AccountList();
                        if (object.Numbers) {
                            if (!Array.isArray(object.Numbers))
                                throw TypeError(".Jde.Markets.Proto.Results.AccountList.Numbers: array expected");
                            message.Numbers = [];
                            for (let i = 0; i < object.Numbers.length; ++i)
                                message.Numbers[i] = String(object.Numbers[i]);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an AccountList message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @static
                     * @param {Jde.Markets.Proto.Results.AccountList} message AccountList
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    AccountList.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Numbers = [];
                        if (message.Numbers && message.Numbers.length) {
                            object.Numbers = [];
                            for (let j = 0; j < message.Numbers.length; ++j)
                                object.Numbers[j] = message.Numbers[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this AccountList to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.AccountList
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    AccountList.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return AccountList;
                })();

                Results.AccountUpdate = (function() {

                    /**
                     * Properties of an AccountUpdate.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IAccountUpdate
                     * @property {string|null} [Account] AccountUpdate Account
                     * @property {string|null} [Key] AccountUpdate Key
                     * @property {string|null} [Value] AccountUpdate Value
                     * @property {string|null} [Currency] AccountUpdate Currency
                     */

                    /**
                     * Constructs a new AccountUpdate.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an AccountUpdate.
                     * @implements IAccountUpdate
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IAccountUpdate=} [properties] Properties to set
                     */
                    function AccountUpdate(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * AccountUpdate Account.
                     * @member {string} Account
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @instance
                     */
                    AccountUpdate.prototype.Account = "";

                    /**
                     * AccountUpdate Key.
                     * @member {string} Key
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @instance
                     */
                    AccountUpdate.prototype.Key = "";

                    /**
                     * AccountUpdate Value.
                     * @member {string} Value
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @instance
                     */
                    AccountUpdate.prototype.Value = "";

                    /**
                     * AccountUpdate Currency.
                     * @member {string} Currency
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @instance
                     */
                    AccountUpdate.prototype.Currency = "";

                    /**
                     * Creates a new AccountUpdate instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountUpdate=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.AccountUpdate} AccountUpdate instance
                     */
                    AccountUpdate.create = function create(properties) {
                        return new AccountUpdate(properties);
                    };

                    /**
                     * Encodes the specified AccountUpdate message. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdate.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountUpdate} message AccountUpdate message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccountUpdate.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Account != null && message.hasOwnProperty("Account"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Account);
                        if (message.Key != null && message.hasOwnProperty("Key"))
                            writer.uint32(/* id 4, wireType 2 =*/34).string(message.Key);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 5, wireType 2 =*/42).string(message.Value);
                        if (message.Currency != null && message.hasOwnProperty("Currency"))
                            writer.uint32(/* id 6, wireType 2 =*/50).string(message.Currency);
                        return writer;
                    };

                    /**
                     * Encodes the specified AccountUpdate message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdate.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountUpdate} message AccountUpdate message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccountUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an AccountUpdate message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.AccountUpdate} AccountUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccountUpdate.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.AccountUpdate();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 2:
                                message.Account = reader.string();
                                break;
                            case 4:
                                message.Key = reader.string();
                                break;
                            case 5:
                                message.Value = reader.string();
                                break;
                            case 6:
                                message.Currency = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an AccountUpdate message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.AccountUpdate} AccountUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccountUpdate.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an AccountUpdate message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    AccountUpdate.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Account != null && message.hasOwnProperty("Account"))
                            if (!$util.isString(message.Account))
                                return "Account: string expected";
                        if (message.Key != null && message.hasOwnProperty("Key"))
                            if (!$util.isString(message.Key))
                                return "Key: string expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isString(message.Value))
                                return "Value: string expected";
                        if (message.Currency != null && message.hasOwnProperty("Currency"))
                            if (!$util.isString(message.Currency))
                                return "Currency: string expected";
                        return null;
                    };

                    /**
                     * Creates an AccountUpdate message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.AccountUpdate} AccountUpdate
                     */
                    AccountUpdate.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.AccountUpdate)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.AccountUpdate();
                        if (object.Account != null)
                            message.Account = String(object.Account);
                        if (object.Key != null)
                            message.Key = String(object.Key);
                        if (object.Value != null)
                            message.Value = String(object.Value);
                        if (object.Currency != null)
                            message.Currency = String(object.Currency);
                        return message;
                    };

                    /**
                     * Creates a plain object from an AccountUpdate message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.AccountUpdate} message AccountUpdate
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    AccountUpdate.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Account = "";
                            object.Key = "";
                            object.Value = "";
                            object.Currency = "";
                        }
                        if (message.Account != null && message.hasOwnProperty("Account"))
                            object.Account = message.Account;
                        if (message.Key != null && message.hasOwnProperty("Key"))
                            object.Key = message.Key;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        if (message.Currency != null && message.hasOwnProperty("Currency"))
                            object.Currency = message.Currency;
                        return object;
                    };

                    /**
                     * Converts this AccountUpdate to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.AccountUpdate
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    AccountUpdate.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return AccountUpdate;
                })();

                Results.AccountUpdateMulti = (function() {

                    /**
                     * Properties of an AccountUpdateMulti.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IAccountUpdateMulti
                     * @property {number|null} [RequestId] AccountUpdateMulti RequestId
                     * @property {string|null} [Account] AccountUpdateMulti Account
                     * @property {string|null} [ModelCode] AccountUpdateMulti ModelCode
                     * @property {string|null} [Key] AccountUpdateMulti Key
                     * @property {string|null} [Value] AccountUpdateMulti Value
                     * @property {string|null} [Currency] AccountUpdateMulti Currency
                     */

                    /**
                     * Constructs a new AccountUpdateMulti.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an AccountUpdateMulti.
                     * @implements IAccountUpdateMulti
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IAccountUpdateMulti=} [properties] Properties to set
                     */
                    function AccountUpdateMulti(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * AccountUpdateMulti RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @instance
                     */
                    AccountUpdateMulti.prototype.RequestId = 0;

                    /**
                     * AccountUpdateMulti Account.
                     * @member {string} Account
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @instance
                     */
                    AccountUpdateMulti.prototype.Account = "";

                    /**
                     * AccountUpdateMulti ModelCode.
                     * @member {string} ModelCode
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @instance
                     */
                    AccountUpdateMulti.prototype.ModelCode = "";

                    /**
                     * AccountUpdateMulti Key.
                     * @member {string} Key
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @instance
                     */
                    AccountUpdateMulti.prototype.Key = "";

                    /**
                     * AccountUpdateMulti Value.
                     * @member {string} Value
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @instance
                     */
                    AccountUpdateMulti.prototype.Value = "";

                    /**
                     * AccountUpdateMulti Currency.
                     * @member {string} Currency
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @instance
                     */
                    AccountUpdateMulti.prototype.Currency = "";

                    /**
                     * Creates a new AccountUpdateMulti instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountUpdateMulti=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.AccountUpdateMulti} AccountUpdateMulti instance
                     */
                    AccountUpdateMulti.create = function create(properties) {
                        return new AccountUpdateMulti(properties);
                    };

                    /**
                     * Encodes the specified AccountUpdateMulti message. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdateMulti.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountUpdateMulti} message AccountUpdateMulti message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccountUpdateMulti.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.Account != null && message.hasOwnProperty("Account"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Account);
                        if (message.ModelCode != null && message.hasOwnProperty("ModelCode"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.ModelCode);
                        if (message.Key != null && message.hasOwnProperty("Key"))
                            writer.uint32(/* id 4, wireType 2 =*/34).string(message.Key);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 5, wireType 2 =*/42).string(message.Value);
                        if (message.Currency != null && message.hasOwnProperty("Currency"))
                            writer.uint32(/* id 6, wireType 2 =*/50).string(message.Currency);
                        return writer;
                    };

                    /**
                     * Encodes the specified AccountUpdateMulti message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdateMulti.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {Jde.Markets.Proto.Results.IAccountUpdateMulti} message AccountUpdateMulti message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccountUpdateMulti.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an AccountUpdateMulti message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.AccountUpdateMulti} AccountUpdateMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccountUpdateMulti.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.AccountUpdateMulti();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.Account = reader.string();
                                break;
                            case 3:
                                message.ModelCode = reader.string();
                                break;
                            case 4:
                                message.Key = reader.string();
                                break;
                            case 5:
                                message.Value = reader.string();
                                break;
                            case 6:
                                message.Currency = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an AccountUpdateMulti message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.AccountUpdateMulti} AccountUpdateMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccountUpdateMulti.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an AccountUpdateMulti message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    AccountUpdateMulti.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Account != null && message.hasOwnProperty("Account"))
                            if (!$util.isString(message.Account))
                                return "Account: string expected";
                        if (message.ModelCode != null && message.hasOwnProperty("ModelCode"))
                            if (!$util.isString(message.ModelCode))
                                return "ModelCode: string expected";
                        if (message.Key != null && message.hasOwnProperty("Key"))
                            if (!$util.isString(message.Key))
                                return "Key: string expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isString(message.Value))
                                return "Value: string expected";
                        if (message.Currency != null && message.hasOwnProperty("Currency"))
                            if (!$util.isString(message.Currency))
                                return "Currency: string expected";
                        return null;
                    };

                    /**
                     * Creates an AccountUpdateMulti message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.AccountUpdateMulti} AccountUpdateMulti
                     */
                    AccountUpdateMulti.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.AccountUpdateMulti)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.AccountUpdateMulti();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.Account != null)
                            message.Account = String(object.Account);
                        if (object.ModelCode != null)
                            message.ModelCode = String(object.ModelCode);
                        if (object.Key != null)
                            message.Key = String(object.Key);
                        if (object.Value != null)
                            message.Value = String(object.Value);
                        if (object.Currency != null)
                            message.Currency = String(object.Currency);
                        return message;
                    };

                    /**
                     * Creates a plain object from an AccountUpdateMulti message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @static
                     * @param {Jde.Markets.Proto.Results.AccountUpdateMulti} message AccountUpdateMulti
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    AccountUpdateMulti.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.Account = "";
                            object.ModelCode = "";
                            object.Key = "";
                            object.Value = "";
                            object.Currency = "";
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Account != null && message.hasOwnProperty("Account"))
                            object.Account = message.Account;
                        if (message.ModelCode != null && message.hasOwnProperty("ModelCode"))
                            object.ModelCode = message.ModelCode;
                        if (message.Key != null && message.hasOwnProperty("Key"))
                            object.Key = message.Key;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        if (message.Currency != null && message.hasOwnProperty("Currency"))
                            object.Currency = message.Currency;
                        return object;
                    };

                    /**
                     * Converts this AccountUpdateMulti to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.AccountUpdateMulti
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    AccountUpdateMulti.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return AccountUpdateMulti;
                })();

                Results.Bar = (function() {

                    /**
                     * Properties of a Bar.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IBar
                     * @property {google.protobuf.ITimestamp|null} [Time] Bar Time
                     * @property {number|null} [High] Bar High
                     * @property {number|null} [Low] Bar Low
                     * @property {number|null} [Open] Bar Open
                     * @property {number|null} [Close] Bar Close
                     * @property {number|null} [Wap] Bar Wap
                     * @property {number|Long|null} [Volume] Bar Volume
                     * @property {number|null} [Count] Bar Count
                     */

                    /**
                     * Constructs a new Bar.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a Bar.
                     * @implements IBar
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IBar=} [properties] Properties to set
                     */
                    function Bar(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Bar Time.
                     * @member {google.protobuf.ITimestamp|null|undefined} Time
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.Time = null;

                    /**
                     * Bar High.
                     * @member {number} High
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.High = 0;

                    /**
                     * Bar Low.
                     * @member {number} Low
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.Low = 0;

                    /**
                     * Bar Open.
                     * @member {number} Open
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.Open = 0;

                    /**
                     * Bar Close.
                     * @member {number} Close
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.Close = 0;

                    /**
                     * Bar Wap.
                     * @member {number} Wap
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.Wap = 0;

                    /**
                     * Bar Volume.
                     * @member {number|Long} Volume
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.Volume = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Bar Count.
                     * @member {number} Count
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     */
                    Bar.prototype.Count = 0;

                    /**
                     * Creates a new Bar instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {Jde.Markets.Proto.Results.IBar=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Bar} Bar instance
                     */
                    Bar.create = function create(properties) {
                        return new Bar(properties);
                    };

                    /**
                     * Encodes the specified Bar message. Does not implicitly {@link Jde.Markets.Proto.Results.Bar.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {Jde.Markets.Proto.Results.IBar} message Bar message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Bar.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Time != null && message.hasOwnProperty("Time"))
                            $root.google.protobuf.Timestamp.encode(message.Time, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.High != null && message.hasOwnProperty("High"))
                            writer.uint32(/* id 2, wireType 1 =*/17).double(message.High);
                        if (message.Low != null && message.hasOwnProperty("Low"))
                            writer.uint32(/* id 3, wireType 1 =*/25).double(message.Low);
                        if (message.Open != null && message.hasOwnProperty("Open"))
                            writer.uint32(/* id 4, wireType 1 =*/33).double(message.Open);
                        if (message.Close != null && message.hasOwnProperty("Close"))
                            writer.uint32(/* id 5, wireType 1 =*/41).double(message.Close);
                        if (message.Wap != null && message.hasOwnProperty("Wap"))
                            writer.uint32(/* id 6, wireType 1 =*/49).double(message.Wap);
                        if (message.Volume != null && message.hasOwnProperty("Volume"))
                            writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.Volume);
                        if (message.Count != null && message.hasOwnProperty("Count"))
                            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.Count);
                        return writer;
                    };

                    /**
                     * Encodes the specified Bar message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Bar.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {Jde.Markets.Proto.Results.IBar} message Bar message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Bar.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Bar message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Bar} Bar
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Bar.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Bar();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Time = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.High = reader.double();
                                break;
                            case 3:
                                message.Low = reader.double();
                                break;
                            case 4:
                                message.Open = reader.double();
                                break;
                            case 5:
                                message.Close = reader.double();
                                break;
                            case 6:
                                message.Wap = reader.double();
                                break;
                            case 7:
                                message.Volume = reader.uint64();
                                break;
                            case 8:
                                message.Count = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Bar message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Bar} Bar
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Bar.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Bar message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Bar.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Time != null && message.hasOwnProperty("Time")) {
                            let error = $root.google.protobuf.Timestamp.verify(message.Time);
                            if (error)
                                return "Time." + error;
                        }
                        if (message.High != null && message.hasOwnProperty("High"))
                            if (typeof message.High !== "number")
                                return "High: number expected";
                        if (message.Low != null && message.hasOwnProperty("Low"))
                            if (typeof message.Low !== "number")
                                return "Low: number expected";
                        if (message.Open != null && message.hasOwnProperty("Open"))
                            if (typeof message.Open !== "number")
                                return "Open: number expected";
                        if (message.Close != null && message.hasOwnProperty("Close"))
                            if (typeof message.Close !== "number")
                                return "Close: number expected";
                        if (message.Wap != null && message.hasOwnProperty("Wap"))
                            if (typeof message.Wap !== "number")
                                return "Wap: number expected";
                        if (message.Volume != null && message.hasOwnProperty("Volume"))
                            if (!$util.isInteger(message.Volume) && !(message.Volume && $util.isInteger(message.Volume.low) && $util.isInteger(message.Volume.high)))
                                return "Volume: integer|Long expected";
                        if (message.Count != null && message.hasOwnProperty("Count"))
                            if (!$util.isInteger(message.Count))
                                return "Count: integer expected";
                        return null;
                    };

                    /**
                     * Creates a Bar message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Bar} Bar
                     */
                    Bar.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Bar)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Bar();
                        if (object.Time != null) {
                            if (typeof object.Time !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.Bar.Time: object expected");
                            message.Time = $root.google.protobuf.Timestamp.fromObject(object.Time);
                        }
                        if (object.High != null)
                            message.High = Number(object.High);
                        if (object.Low != null)
                            message.Low = Number(object.Low);
                        if (object.Open != null)
                            message.Open = Number(object.Open);
                        if (object.Close != null)
                            message.Close = Number(object.Close);
                        if (object.Wap != null)
                            message.Wap = Number(object.Wap);
                        if (object.Volume != null)
                            if ($util.Long)
                                (message.Volume = $util.Long.fromValue(object.Volume)).unsigned = true;
                            else if (typeof object.Volume === "string")
                                message.Volume = parseInt(object.Volume, 10);
                            else if (typeof object.Volume === "number")
                                message.Volume = object.Volume;
                            else if (typeof object.Volume === "object")
                                message.Volume = new $util.LongBits(object.Volume.low >>> 0, object.Volume.high >>> 0).toNumber(true);
                        if (object.Count != null)
                            message.Count = object.Count | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a Bar message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @static
                     * @param {Jde.Markets.Proto.Results.Bar} message Bar
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Bar.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Time = null;
                            object.High = 0;
                            object.Low = 0;
                            object.Open = 0;
                            object.Close = 0;
                            object.Wap = 0;
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.Volume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.Volume = options.longs === String ? "0" : 0;
                            object.Count = 0;
                        }
                        if (message.Time != null && message.hasOwnProperty("Time"))
                            object.Time = $root.google.protobuf.Timestamp.toObject(message.Time, options);
                        if (message.High != null && message.hasOwnProperty("High"))
                            object.High = options.json && !isFinite(message.High) ? String(message.High) : message.High;
                        if (message.Low != null && message.hasOwnProperty("Low"))
                            object.Low = options.json && !isFinite(message.Low) ? String(message.Low) : message.Low;
                        if (message.Open != null && message.hasOwnProperty("Open"))
                            object.Open = options.json && !isFinite(message.Open) ? String(message.Open) : message.Open;
                        if (message.Close != null && message.hasOwnProperty("Close"))
                            object.Close = options.json && !isFinite(message.Close) ? String(message.Close) : message.Close;
                        if (message.Wap != null && message.hasOwnProperty("Wap"))
                            object.Wap = options.json && !isFinite(message.Wap) ? String(message.Wap) : message.Wap;
                        if (message.Volume != null && message.hasOwnProperty("Volume"))
                            if (typeof message.Volume === "number")
                                object.Volume = options.longs === String ? String(message.Volume) : message.Volume;
                            else
                                object.Volume = options.longs === String ? $util.Long.prototype.toString.call(message.Volume) : options.longs === Number ? new $util.LongBits(message.Volume.low >>> 0, message.Volume.high >>> 0).toNumber(true) : message.Volume;
                        if (message.Count != null && message.hasOwnProperty("Count"))
                            object.Count = message.Count;
                        return object;
                    };

                    /**
                     * Converts this Bar to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Bar
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Bar.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Bar;
                })();

                Results.HistoricalData = (function() {

                    /**
                     * Properties of a HistoricalData.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IHistoricalData
                     * @property {number|null} [RequestId] HistoricalData RequestId
                     * @property {Array.<Jde.Markets.Proto.Results.IBar>|null} [Bars] HistoricalData Bars
                     */

                    /**
                     * Constructs a new HistoricalData.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a HistoricalData.
                     * @implements IHistoricalData
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IHistoricalData=} [properties] Properties to set
                     */
                    function HistoricalData(properties) {
                        this.Bars = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * HistoricalData RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @instance
                     */
                    HistoricalData.prototype.RequestId = 0;

                    /**
                     * HistoricalData Bars.
                     * @member {Array.<Jde.Markets.Proto.Results.IBar>} Bars
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @instance
                     */
                    HistoricalData.prototype.Bars = $util.emptyArray;

                    /**
                     * Creates a new HistoricalData instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Results.IHistoricalData=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.HistoricalData} HistoricalData instance
                     */
                    HistoricalData.create = function create(properties) {
                        return new HistoricalData(properties);
                    };

                    /**
                     * Encodes the specified HistoricalData message. Does not implicitly {@link Jde.Markets.Proto.Results.HistoricalData.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Results.IHistoricalData} message HistoricalData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    HistoricalData.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.Bars != null && message.Bars.length)
                            for (let i = 0; i < message.Bars.length; ++i)
                                $root.Jde.Markets.Proto.Results.Bar.encode(message.Bars[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified HistoricalData message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.HistoricalData.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Results.IHistoricalData} message HistoricalData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    HistoricalData.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a HistoricalData message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.HistoricalData} HistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    HistoricalData.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.HistoricalData();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                if (!(message.Bars && message.Bars.length))
                                    message.Bars = [];
                                message.Bars.push($root.Jde.Markets.Proto.Results.Bar.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a HistoricalData message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.HistoricalData} HistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    HistoricalData.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a HistoricalData message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    HistoricalData.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Bars != null && message.hasOwnProperty("Bars")) {
                            if (!Array.isArray(message.Bars))
                                return "Bars: array expected";
                            for (let i = 0; i < message.Bars.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Results.Bar.verify(message.Bars[i]);
                                if (error)
                                    return "Bars." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a HistoricalData message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.HistoricalData} HistoricalData
                     */
                    HistoricalData.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.HistoricalData)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.HistoricalData();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.Bars) {
                            if (!Array.isArray(object.Bars))
                                throw TypeError(".Jde.Markets.Proto.Results.HistoricalData.Bars: array expected");
                            message.Bars = [];
                            for (let i = 0; i < object.Bars.length; ++i) {
                                if (typeof object.Bars[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Results.HistoricalData.Bars: object expected");
                                message.Bars[i] = $root.Jde.Markets.Proto.Results.Bar.fromObject(object.Bars[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a HistoricalData message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Results.HistoricalData} message HistoricalData
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    HistoricalData.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Bars = [];
                        if (options.defaults)
                            object.RequestId = 0;
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Bars && message.Bars.length) {
                            object.Bars = [];
                            for (let j = 0; j < message.Bars.length; ++j)
                                object.Bars[j] = $root.Jde.Markets.Proto.Results.Bar.toObject(message.Bars[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this HistoricalData to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.HistoricalData
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    HistoricalData.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return HistoricalData;
                })();

                Results.PortfolioUpdate = (function() {

                    /**
                     * Properties of a PortfolioUpdate.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IPortfolioUpdate
                     * @property {Jde.Markets.Proto.IContract|null} [Contract] PortfolioUpdate Contract
                     * @property {number|null} [Position] PortfolioUpdate Position
                     * @property {number|null} [MarketPrice] PortfolioUpdate MarketPrice
                     * @property {number|null} [MarketValue] PortfolioUpdate MarketValue
                     * @property {number|null} [AverageCost] PortfolioUpdate AverageCost
                     * @property {number|null} [UnrealizedPnl] PortfolioUpdate UnrealizedPnl
                     * @property {number|null} [RealizedPnl] PortfolioUpdate RealizedPnl
                     * @property {string|null} [AccountNumber] PortfolioUpdate AccountNumber
                     */

                    /**
                     * Constructs a new PortfolioUpdate.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a PortfolioUpdate.
                     * @implements IPortfolioUpdate
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IPortfolioUpdate=} [properties] Properties to set
                     */
                    function PortfolioUpdate(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * PortfolioUpdate Contract.
                     * @member {Jde.Markets.Proto.IContract|null|undefined} Contract
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.Contract = null;

                    /**
                     * PortfolioUpdate Position.
                     * @member {number} Position
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.Position = 0;

                    /**
                     * PortfolioUpdate MarketPrice.
                     * @member {number} MarketPrice
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.MarketPrice = 0;

                    /**
                     * PortfolioUpdate MarketValue.
                     * @member {number} MarketValue
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.MarketValue = 0;

                    /**
                     * PortfolioUpdate AverageCost.
                     * @member {number} AverageCost
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.AverageCost = 0;

                    /**
                     * PortfolioUpdate UnrealizedPnl.
                     * @member {number} UnrealizedPnl
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.UnrealizedPnl = 0;

                    /**
                     * PortfolioUpdate RealizedPnl.
                     * @member {number} RealizedPnl
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.RealizedPnl = 0;

                    /**
                     * PortfolioUpdate AccountNumber.
                     * @member {string} AccountNumber
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     */
                    PortfolioUpdate.prototype.AccountNumber = "";

                    /**
                     * Creates a new PortfolioUpdate instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.IPortfolioUpdate=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.PortfolioUpdate} PortfolioUpdate instance
                     */
                    PortfolioUpdate.create = function create(properties) {
                        return new PortfolioUpdate(properties);
                    };

                    /**
                     * Encodes the specified PortfolioUpdate message. Does not implicitly {@link Jde.Markets.Proto.Results.PortfolioUpdate.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.IPortfolioUpdate} message PortfolioUpdate message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PortfolioUpdate.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            $root.Jde.Markets.Proto.Contract.encode(message.Contract, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.Position != null && message.hasOwnProperty("Position"))
                            writer.uint32(/* id 2, wireType 1 =*/17).double(message.Position);
                        if (message.MarketPrice != null && message.hasOwnProperty("MarketPrice"))
                            writer.uint32(/* id 3, wireType 1 =*/25).double(message.MarketPrice);
                        if (message.MarketValue != null && message.hasOwnProperty("MarketValue"))
                            writer.uint32(/* id 4, wireType 1 =*/33).double(message.MarketValue);
                        if (message.AverageCost != null && message.hasOwnProperty("AverageCost"))
                            writer.uint32(/* id 5, wireType 1 =*/41).double(message.AverageCost);
                        if (message.UnrealizedPnl != null && message.hasOwnProperty("UnrealizedPnl"))
                            writer.uint32(/* id 6, wireType 1 =*/49).double(message.UnrealizedPnl);
                        if (message.RealizedPnl != null && message.hasOwnProperty("RealizedPnl"))
                            writer.uint32(/* id 7, wireType 1 =*/57).double(message.RealizedPnl);
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            writer.uint32(/* id 8, wireType 2 =*/66).string(message.AccountNumber);
                        return writer;
                    };

                    /**
                     * Encodes the specified PortfolioUpdate message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.PortfolioUpdate.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.IPortfolioUpdate} message PortfolioUpdate message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PortfolioUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a PortfolioUpdate message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.PortfolioUpdate} PortfolioUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PortfolioUpdate.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.PortfolioUpdate();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Contract = $root.Jde.Markets.Proto.Contract.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.Position = reader.double();
                                break;
                            case 3:
                                message.MarketPrice = reader.double();
                                break;
                            case 4:
                                message.MarketValue = reader.double();
                                break;
                            case 5:
                                message.AverageCost = reader.double();
                                break;
                            case 6:
                                message.UnrealizedPnl = reader.double();
                                break;
                            case 7:
                                message.RealizedPnl = reader.double();
                                break;
                            case 8:
                                message.AccountNumber = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a PortfolioUpdate message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.PortfolioUpdate} PortfolioUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PortfolioUpdate.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a PortfolioUpdate message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    PortfolioUpdate.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Contract != null && message.hasOwnProperty("Contract")) {
                            let error = $root.Jde.Markets.Proto.Contract.verify(message.Contract);
                            if (error)
                                return "Contract." + error;
                        }
                        if (message.Position != null && message.hasOwnProperty("Position"))
                            if (typeof message.Position !== "number")
                                return "Position: number expected";
                        if (message.MarketPrice != null && message.hasOwnProperty("MarketPrice"))
                            if (typeof message.MarketPrice !== "number")
                                return "MarketPrice: number expected";
                        if (message.MarketValue != null && message.hasOwnProperty("MarketValue"))
                            if (typeof message.MarketValue !== "number")
                                return "MarketValue: number expected";
                        if (message.AverageCost != null && message.hasOwnProperty("AverageCost"))
                            if (typeof message.AverageCost !== "number")
                                return "AverageCost: number expected";
                        if (message.UnrealizedPnl != null && message.hasOwnProperty("UnrealizedPnl"))
                            if (typeof message.UnrealizedPnl !== "number")
                                return "UnrealizedPnl: number expected";
                        if (message.RealizedPnl != null && message.hasOwnProperty("RealizedPnl"))
                            if (typeof message.RealizedPnl !== "number")
                                return "RealizedPnl: number expected";
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            if (!$util.isString(message.AccountNumber))
                                return "AccountNumber: string expected";
                        return null;
                    };

                    /**
                     * Creates a PortfolioUpdate message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.PortfolioUpdate} PortfolioUpdate
                     */
                    PortfolioUpdate.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.PortfolioUpdate)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.PortfolioUpdate();
                        if (object.Contract != null) {
                            if (typeof object.Contract !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.PortfolioUpdate.Contract: object expected");
                            message.Contract = $root.Jde.Markets.Proto.Contract.fromObject(object.Contract);
                        }
                        if (object.Position != null)
                            message.Position = Number(object.Position);
                        if (object.MarketPrice != null)
                            message.MarketPrice = Number(object.MarketPrice);
                        if (object.MarketValue != null)
                            message.MarketValue = Number(object.MarketValue);
                        if (object.AverageCost != null)
                            message.AverageCost = Number(object.AverageCost);
                        if (object.UnrealizedPnl != null)
                            message.UnrealizedPnl = Number(object.UnrealizedPnl);
                        if (object.RealizedPnl != null)
                            message.RealizedPnl = Number(object.RealizedPnl);
                        if (object.AccountNumber != null)
                            message.AccountNumber = String(object.AccountNumber);
                        return message;
                    };

                    /**
                     * Creates a plain object from a PortfolioUpdate message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @static
                     * @param {Jde.Markets.Proto.Results.PortfolioUpdate} message PortfolioUpdate
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    PortfolioUpdate.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Contract = null;
                            object.Position = 0;
                            object.MarketPrice = 0;
                            object.MarketValue = 0;
                            object.AverageCost = 0;
                            object.UnrealizedPnl = 0;
                            object.RealizedPnl = 0;
                            object.AccountNumber = "";
                        }
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            object.Contract = $root.Jde.Markets.Proto.Contract.toObject(message.Contract, options);
                        if (message.Position != null && message.hasOwnProperty("Position"))
                            object.Position = options.json && !isFinite(message.Position) ? String(message.Position) : message.Position;
                        if (message.MarketPrice != null && message.hasOwnProperty("MarketPrice"))
                            object.MarketPrice = options.json && !isFinite(message.MarketPrice) ? String(message.MarketPrice) : message.MarketPrice;
                        if (message.MarketValue != null && message.hasOwnProperty("MarketValue"))
                            object.MarketValue = options.json && !isFinite(message.MarketValue) ? String(message.MarketValue) : message.MarketValue;
                        if (message.AverageCost != null && message.hasOwnProperty("AverageCost"))
                            object.AverageCost = options.json && !isFinite(message.AverageCost) ? String(message.AverageCost) : message.AverageCost;
                        if (message.UnrealizedPnl != null && message.hasOwnProperty("UnrealizedPnl"))
                            object.UnrealizedPnl = options.json && !isFinite(message.UnrealizedPnl) ? String(message.UnrealizedPnl) : message.UnrealizedPnl;
                        if (message.RealizedPnl != null && message.hasOwnProperty("RealizedPnl"))
                            object.RealizedPnl = options.json && !isFinite(message.RealizedPnl) ? String(message.RealizedPnl) : message.RealizedPnl;
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            object.AccountNumber = message.AccountNumber;
                        return object;
                    };

                    /**
                     * Converts this PortfolioUpdate to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.PortfolioUpdate
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PortfolioUpdate.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return PortfolioUpdate;
                })();

                Results.Order = (function() {

                    /**
                     * Properties of an Order.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IOrder
                     * @property {number|null} [Id] Order Id
                     * @property {string|null} [AccountId] Order AccountId
                     * @property {string|null} [Symbol] Order Symbol
                     * @property {number|null} [Conid] Order Conid
                     * @property {number|null} [Date] Order Date
                     * @property {string|null} [BuySell] Order BuySell
                     * @property {number|null} [Quantity] Order Quantity
                     * @property {number|null} [Price] Order Price
                     * @property {number|null} [Commission] Order Commission
                     * @property {string|null} [OrderType] Order OrderType
                     * @property {number|null} [OrderTime] Order OrderTime
                     */

                    /**
                     * Constructs a new Order.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an Order.
                     * @implements IOrder
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IOrder=} [properties] Properties to set
                     */
                    function Order(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Order Id.
                     * @member {number} Id
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.Id = 0;

                    /**
                     * Order AccountId.
                     * @member {string} AccountId
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.AccountId = "";

                    /**
                     * Order Symbol.
                     * @member {string} Symbol
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.Symbol = "";

                    /**
                     * Order Conid.
                     * @member {number} Conid
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.Conid = 0;

                    /**
                     * Order Date.
                     * @member {number} Date
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.Date = 0;

                    /**
                     * Order BuySell.
                     * @member {string} BuySell
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.BuySell = "";

                    /**
                     * Order Quantity.
                     * @member {number} Quantity
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.Quantity = 0;

                    /**
                     * Order Price.
                     * @member {number} Price
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.Price = 0;

                    /**
                     * Order Commission.
                     * @member {number} Commission
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.Commission = 0;

                    /**
                     * Order OrderType.
                     * @member {string} OrderType
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.OrderType = "";

                    /**
                     * Order OrderTime.
                     * @member {number} OrderTime
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     */
                    Order.prototype.OrderTime = 0;

                    /**
                     * Creates a new Order instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOrder=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Order} Order instance
                     */
                    Order.create = function create(properties) {
                        return new Order(properties);
                    };

                    /**
                     * Encodes the specified Order message. Does not implicitly {@link Jde.Markets.Proto.Results.Order.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOrder} message Order message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Order.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Id);
                        if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.AccountId);
                        if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.Symbol);
                        if (message.Conid != null && message.hasOwnProperty("Conid"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.Conid);
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.Date);
                        if (message.BuySell != null && message.hasOwnProperty("BuySell"))
                            writer.uint32(/* id 6, wireType 2 =*/50).string(message.BuySell);
                        if (message.Quantity != null && message.hasOwnProperty("Quantity"))
                            writer.uint32(/* id 7, wireType 1 =*/57).double(message.Quantity);
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            writer.uint32(/* id 8, wireType 1 =*/65).double(message.Price);
                        if (message.Commission != null && message.hasOwnProperty("Commission"))
                            writer.uint32(/* id 9, wireType 1 =*/73).double(message.Commission);
                        if (message.OrderType != null && message.hasOwnProperty("OrderType"))
                            writer.uint32(/* id 10, wireType 2 =*/82).string(message.OrderType);
                        if (message.OrderTime != null && message.hasOwnProperty("OrderTime"))
                            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.OrderTime);
                        return writer;
                    };

                    /**
                     * Encodes the specified Order message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Order.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOrder} message Order message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Order.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an Order message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Order} Order
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Order.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Order();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Id = reader.uint32();
                                break;
                            case 2:
                                message.AccountId = reader.string();
                                break;
                            case 3:
                                message.Symbol = reader.string();
                                break;
                            case 4:
                                message.Conid = reader.uint32();
                                break;
                            case 5:
                                message.Date = reader.uint32();
                                break;
                            case 6:
                                message.BuySell = reader.string();
                                break;
                            case 7:
                                message.Quantity = reader.double();
                                break;
                            case 8:
                                message.Price = reader.double();
                                break;
                            case 9:
                                message.Commission = reader.double();
                                break;
                            case 10:
                                message.OrderType = reader.string();
                                break;
                            case 11:
                                message.OrderTime = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an Order message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Order} Order
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Order.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an Order message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Order.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            if (!$util.isInteger(message.Id))
                                return "Id: integer expected";
                        if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                            if (!$util.isString(message.AccountId))
                                return "AccountId: string expected";
                        if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                            if (!$util.isString(message.Symbol))
                                return "Symbol: string expected";
                        if (message.Conid != null && message.hasOwnProperty("Conid"))
                            if (!$util.isInteger(message.Conid))
                                return "Conid: integer expected";
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            if (!$util.isInteger(message.Date))
                                return "Date: integer expected";
                        if (message.BuySell != null && message.hasOwnProperty("BuySell"))
                            if (!$util.isString(message.BuySell))
                                return "BuySell: string expected";
                        if (message.Quantity != null && message.hasOwnProperty("Quantity"))
                            if (typeof message.Quantity !== "number")
                                return "Quantity: number expected";
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            if (typeof message.Price !== "number")
                                return "Price: number expected";
                        if (message.Commission != null && message.hasOwnProperty("Commission"))
                            if (typeof message.Commission !== "number")
                                return "Commission: number expected";
                        if (message.OrderType != null && message.hasOwnProperty("OrderType"))
                            if (!$util.isString(message.OrderType))
                                return "OrderType: string expected";
                        if (message.OrderTime != null && message.hasOwnProperty("OrderTime"))
                            if (!$util.isInteger(message.OrderTime))
                                return "OrderTime: integer expected";
                        return null;
                    };

                    /**
                     * Creates an Order message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Order} Order
                     */
                    Order.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Order)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Order();
                        if (object.Id != null)
                            message.Id = object.Id >>> 0;
                        if (object.AccountId != null)
                            message.AccountId = String(object.AccountId);
                        if (object.Symbol != null)
                            message.Symbol = String(object.Symbol);
                        if (object.Conid != null)
                            message.Conid = object.Conid >>> 0;
                        if (object.Date != null)
                            message.Date = object.Date >>> 0;
                        if (object.BuySell != null)
                            message.BuySell = String(object.BuySell);
                        if (object.Quantity != null)
                            message.Quantity = Number(object.Quantity);
                        if (object.Price != null)
                            message.Price = Number(object.Price);
                        if (object.Commission != null)
                            message.Commission = Number(object.Commission);
                        if (object.OrderType != null)
                            message.OrderType = String(object.OrderType);
                        if (object.OrderTime != null)
                            message.OrderTime = object.OrderTime >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from an Order message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @static
                     * @param {Jde.Markets.Proto.Results.Order} message Order
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Order.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Id = 0;
                            object.AccountId = "";
                            object.Symbol = "";
                            object.Conid = 0;
                            object.Date = 0;
                            object.BuySell = "";
                            object.Quantity = 0;
                            object.Price = 0;
                            object.Commission = 0;
                            object.OrderType = "";
                            object.OrderTime = 0;
                        }
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            object.Id = message.Id;
                        if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                            object.AccountId = message.AccountId;
                        if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                            object.Symbol = message.Symbol;
                        if (message.Conid != null && message.hasOwnProperty("Conid"))
                            object.Conid = message.Conid;
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            object.Date = message.Date;
                        if (message.BuySell != null && message.hasOwnProperty("BuySell"))
                            object.BuySell = message.BuySell;
                        if (message.Quantity != null && message.hasOwnProperty("Quantity"))
                            object.Quantity = options.json && !isFinite(message.Quantity) ? String(message.Quantity) : message.Quantity;
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            object.Price = options.json && !isFinite(message.Price) ? String(message.Price) : message.Price;
                        if (message.Commission != null && message.hasOwnProperty("Commission"))
                            object.Commission = options.json && !isFinite(message.Commission) ? String(message.Commission) : message.Commission;
                        if (message.OrderType != null && message.hasOwnProperty("OrderType"))
                            object.OrderType = message.OrderType;
                        if (message.OrderTime != null && message.hasOwnProperty("OrderTime"))
                            object.OrderTime = message.OrderTime;
                        return object;
                    };

                    /**
                     * Converts this Order to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Order
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Order.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Order;
                })();

                Results.Trade = (function() {

                    /**
                     * Properties of a Trade.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITrade
                     * @property {number|null} [OrderId] Trade OrderId
                     * @property {string|null} [AccountId] Trade AccountId
                     * @property {string|null} [Symbol] Trade Symbol
                     * @property {number|null} [Conid] Trade Conid
                     * @property {number|null} [Date] Trade Date
                     * @property {string|null} [BuySell] Trade BuySell
                     * @property {number|null} [Quantity] Trade Quantity
                     * @property {number|null} [Price] Trade Price
                     * @property {number|null} [Commission] Trade Commission
                     * @property {string|null} [OrderType] Trade OrderType
                     * @property {number|null} [OrderTime] Trade OrderTime
                     * @property {number|null} [Id] Trade Id
                     * @property {string|null} [ExecId] Trade ExecId
                     * @property {boolean|null} [IsApi] Trade IsApi
                     */

                    /**
                     * Constructs a new Trade.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a Trade.
                     * @implements ITrade
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITrade=} [properties] Properties to set
                     */
                    function Trade(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Trade OrderId.
                     * @member {number} OrderId
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.OrderId = 0;

                    /**
                     * Trade AccountId.
                     * @member {string} AccountId
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.AccountId = "";

                    /**
                     * Trade Symbol.
                     * @member {string} Symbol
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.Symbol = "";

                    /**
                     * Trade Conid.
                     * @member {number} Conid
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.Conid = 0;

                    /**
                     * Trade Date.
                     * @member {number} Date
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.Date = 0;

                    /**
                     * Trade BuySell.
                     * @member {string} BuySell
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.BuySell = "";

                    /**
                     * Trade Quantity.
                     * @member {number} Quantity
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.Quantity = 0;

                    /**
                     * Trade Price.
                     * @member {number} Price
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.Price = 0;

                    /**
                     * Trade Commission.
                     * @member {number} Commission
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.Commission = 0;

                    /**
                     * Trade OrderType.
                     * @member {string} OrderType
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.OrderType = "";

                    /**
                     * Trade OrderTime.
                     * @member {number} OrderTime
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.OrderTime = 0;

                    /**
                     * Trade Id.
                     * @member {number} Id
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.Id = 0;

                    /**
                     * Trade ExecId.
                     * @member {string} ExecId
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.ExecId = "";

                    /**
                     * Trade IsApi.
                     * @member {boolean} IsApi
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     */
                    Trade.prototype.IsApi = false;

                    /**
                     * Creates a new Trade instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITrade=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Trade} Trade instance
                     */
                    Trade.create = function create(properties) {
                        return new Trade(properties);
                    };

                    /**
                     * Encodes the specified Trade message. Does not implicitly {@link Jde.Markets.Proto.Results.Trade.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITrade} message Trade message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Trade.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.OrderId != null && message.hasOwnProperty("OrderId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.OrderId);
                        if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.AccountId);
                        if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.Symbol);
                        if (message.Conid != null && message.hasOwnProperty("Conid"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.Conid);
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.Date);
                        if (message.BuySell != null && message.hasOwnProperty("BuySell"))
                            writer.uint32(/* id 6, wireType 2 =*/50).string(message.BuySell);
                        if (message.Quantity != null && message.hasOwnProperty("Quantity"))
                            writer.uint32(/* id 7, wireType 1 =*/57).double(message.Quantity);
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            writer.uint32(/* id 8, wireType 1 =*/65).double(message.Price);
                        if (message.Commission != null && message.hasOwnProperty("Commission"))
                            writer.uint32(/* id 9, wireType 1 =*/73).double(message.Commission);
                        if (message.OrderType != null && message.hasOwnProperty("OrderType"))
                            writer.uint32(/* id 10, wireType 2 =*/82).string(message.OrderType);
                        if (message.OrderTime != null && message.hasOwnProperty("OrderTime"))
                            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.OrderTime);
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.Id);
                        if (message.ExecId != null && message.hasOwnProperty("ExecId"))
                            writer.uint32(/* id 13, wireType 2 =*/106).string(message.ExecId);
                        if (message.IsApi != null && message.hasOwnProperty("IsApi"))
                            writer.uint32(/* id 14, wireType 0 =*/112).bool(message.IsApi);
                        return writer;
                    };

                    /**
                     * Encodes the specified Trade message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Trade.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITrade} message Trade message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Trade.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Trade message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Trade} Trade
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Trade.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Trade();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.OrderId = reader.uint32();
                                break;
                            case 2:
                                message.AccountId = reader.string();
                                break;
                            case 3:
                                message.Symbol = reader.string();
                                break;
                            case 4:
                                message.Conid = reader.uint32();
                                break;
                            case 5:
                                message.Date = reader.uint32();
                                break;
                            case 6:
                                message.BuySell = reader.string();
                                break;
                            case 7:
                                message.Quantity = reader.double();
                                break;
                            case 8:
                                message.Price = reader.double();
                                break;
                            case 9:
                                message.Commission = reader.double();
                                break;
                            case 10:
                                message.OrderType = reader.string();
                                break;
                            case 11:
                                message.OrderTime = reader.uint32();
                                break;
                            case 12:
                                message.Id = reader.uint32();
                                break;
                            case 13:
                                message.ExecId = reader.string();
                                break;
                            case 14:
                                message.IsApi = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Trade message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Trade} Trade
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Trade.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Trade message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Trade.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.OrderId != null && message.hasOwnProperty("OrderId"))
                            if (!$util.isInteger(message.OrderId))
                                return "OrderId: integer expected";
                        if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                            if (!$util.isString(message.AccountId))
                                return "AccountId: string expected";
                        if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                            if (!$util.isString(message.Symbol))
                                return "Symbol: string expected";
                        if (message.Conid != null && message.hasOwnProperty("Conid"))
                            if (!$util.isInteger(message.Conid))
                                return "Conid: integer expected";
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            if (!$util.isInteger(message.Date))
                                return "Date: integer expected";
                        if (message.BuySell != null && message.hasOwnProperty("BuySell"))
                            if (!$util.isString(message.BuySell))
                                return "BuySell: string expected";
                        if (message.Quantity != null && message.hasOwnProperty("Quantity"))
                            if (typeof message.Quantity !== "number")
                                return "Quantity: number expected";
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            if (typeof message.Price !== "number")
                                return "Price: number expected";
                        if (message.Commission != null && message.hasOwnProperty("Commission"))
                            if (typeof message.Commission !== "number")
                                return "Commission: number expected";
                        if (message.OrderType != null && message.hasOwnProperty("OrderType"))
                            if (!$util.isString(message.OrderType))
                                return "OrderType: string expected";
                        if (message.OrderTime != null && message.hasOwnProperty("OrderTime"))
                            if (!$util.isInteger(message.OrderTime))
                                return "OrderTime: integer expected";
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            if (!$util.isInteger(message.Id))
                                return "Id: integer expected";
                        if (message.ExecId != null && message.hasOwnProperty("ExecId"))
                            if (!$util.isString(message.ExecId))
                                return "ExecId: string expected";
                        if (message.IsApi != null && message.hasOwnProperty("IsApi"))
                            if (typeof message.IsApi !== "boolean")
                                return "IsApi: boolean expected";
                        return null;
                    };

                    /**
                     * Creates a Trade message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Trade} Trade
                     */
                    Trade.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Trade)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Trade();
                        if (object.OrderId != null)
                            message.OrderId = object.OrderId >>> 0;
                        if (object.AccountId != null)
                            message.AccountId = String(object.AccountId);
                        if (object.Symbol != null)
                            message.Symbol = String(object.Symbol);
                        if (object.Conid != null)
                            message.Conid = object.Conid >>> 0;
                        if (object.Date != null)
                            message.Date = object.Date >>> 0;
                        if (object.BuySell != null)
                            message.BuySell = String(object.BuySell);
                        if (object.Quantity != null)
                            message.Quantity = Number(object.Quantity);
                        if (object.Price != null)
                            message.Price = Number(object.Price);
                        if (object.Commission != null)
                            message.Commission = Number(object.Commission);
                        if (object.OrderType != null)
                            message.OrderType = String(object.OrderType);
                        if (object.OrderTime != null)
                            message.OrderTime = object.OrderTime >>> 0;
                        if (object.Id != null)
                            message.Id = object.Id >>> 0;
                        if (object.ExecId != null)
                            message.ExecId = String(object.ExecId);
                        if (object.IsApi != null)
                            message.IsApi = Boolean(object.IsApi);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Trade message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @static
                     * @param {Jde.Markets.Proto.Results.Trade} message Trade
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Trade.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.OrderId = 0;
                            object.AccountId = "";
                            object.Symbol = "";
                            object.Conid = 0;
                            object.Date = 0;
                            object.BuySell = "";
                            object.Quantity = 0;
                            object.Price = 0;
                            object.Commission = 0;
                            object.OrderType = "";
                            object.OrderTime = 0;
                            object.Id = 0;
                            object.ExecId = "";
                            object.IsApi = false;
                        }
                        if (message.OrderId != null && message.hasOwnProperty("OrderId"))
                            object.OrderId = message.OrderId;
                        if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                            object.AccountId = message.AccountId;
                        if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                            object.Symbol = message.Symbol;
                        if (message.Conid != null && message.hasOwnProperty("Conid"))
                            object.Conid = message.Conid;
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            object.Date = message.Date;
                        if (message.BuySell != null && message.hasOwnProperty("BuySell"))
                            object.BuySell = message.BuySell;
                        if (message.Quantity != null && message.hasOwnProperty("Quantity"))
                            object.Quantity = options.json && !isFinite(message.Quantity) ? String(message.Quantity) : message.Quantity;
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            object.Price = options.json && !isFinite(message.Price) ? String(message.Price) : message.Price;
                        if (message.Commission != null && message.hasOwnProperty("Commission"))
                            object.Commission = options.json && !isFinite(message.Commission) ? String(message.Commission) : message.Commission;
                        if (message.OrderType != null && message.hasOwnProperty("OrderType"))
                            object.OrderType = message.OrderType;
                        if (message.OrderTime != null && message.hasOwnProperty("OrderTime"))
                            object.OrderTime = message.OrderTime;
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            object.Id = message.Id;
                        if (message.ExecId != null && message.hasOwnProperty("ExecId"))
                            object.ExecId = message.ExecId;
                        if (message.IsApi != null && message.hasOwnProperty("IsApi"))
                            object.IsApi = message.IsApi;
                        return object;
                    };

                    /**
                     * Converts this Trade to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Trade
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Trade.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Trade;
                })();

                Results.Flex = (function() {

                    /**
                     * Properties of a Flex.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IFlex
                     * @property {number|null} [RequestId] Flex RequestId
                     * @property {Array.<Jde.Markets.Proto.Results.IOrder>|null} [Orders] Flex Orders
                     * @property {Array.<Jde.Markets.Proto.Results.ITrade>|null} [Trades] Flex Trades
                     */

                    /**
                     * Constructs a new Flex.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a Flex.
                     * @implements IFlex
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IFlex=} [properties] Properties to set
                     */
                    function Flex(properties) {
                        this.Orders = [];
                        this.Trades = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Flex RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @instance
                     */
                    Flex.prototype.RequestId = 0;

                    /**
                     * Flex Orders.
                     * @member {Array.<Jde.Markets.Proto.Results.IOrder>} Orders
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @instance
                     */
                    Flex.prototype.Orders = $util.emptyArray;

                    /**
                     * Flex Trades.
                     * @member {Array.<Jde.Markets.Proto.Results.ITrade>} Trades
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @instance
                     */
                    Flex.prototype.Trades = $util.emptyArray;

                    /**
                     * Creates a new Flex instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {Jde.Markets.Proto.Results.IFlex=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Flex} Flex instance
                     */
                    Flex.create = function create(properties) {
                        return new Flex(properties);
                    };

                    /**
                     * Encodes the specified Flex message. Does not implicitly {@link Jde.Markets.Proto.Results.Flex.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {Jde.Markets.Proto.Results.IFlex} message Flex message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Flex.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RequestId);
                        if (message.Orders != null && message.Orders.length)
                            for (let i = 0; i < message.Orders.length; ++i)
                                $root.Jde.Markets.Proto.Results.Order.encode(message.Orders[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.Trades != null && message.Trades.length)
                            for (let i = 0; i < message.Trades.length; ++i)
                                $root.Jde.Markets.Proto.Results.Trade.encode(message.Trades[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Flex message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Flex.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {Jde.Markets.Proto.Results.IFlex} message Flex message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Flex.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Flex message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Flex} Flex
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Flex.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Flex();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.uint32();
                                break;
                            case 2:
                                if (!(message.Orders && message.Orders.length))
                                    message.Orders = [];
                                message.Orders.push($root.Jde.Markets.Proto.Results.Order.decode(reader, reader.uint32()));
                                break;
                            case 3:
                                if (!(message.Trades && message.Trades.length))
                                    message.Trades = [];
                                message.Trades.push($root.Jde.Markets.Proto.Results.Trade.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Flex message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Flex} Flex
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Flex.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Flex message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Flex.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Orders != null && message.hasOwnProperty("Orders")) {
                            if (!Array.isArray(message.Orders))
                                return "Orders: array expected";
                            for (let i = 0; i < message.Orders.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Results.Order.verify(message.Orders[i]);
                                if (error)
                                    return "Orders." + error;
                            }
                        }
                        if (message.Trades != null && message.hasOwnProperty("Trades")) {
                            if (!Array.isArray(message.Trades))
                                return "Trades: array expected";
                            for (let i = 0; i < message.Trades.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Results.Trade.verify(message.Trades[i]);
                                if (error)
                                    return "Trades." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Flex message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Flex} Flex
                     */
                    Flex.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Flex)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Flex();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId >>> 0;
                        if (object.Orders) {
                            if (!Array.isArray(object.Orders))
                                throw TypeError(".Jde.Markets.Proto.Results.Flex.Orders: array expected");
                            message.Orders = [];
                            for (let i = 0; i < object.Orders.length; ++i) {
                                if (typeof object.Orders[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Results.Flex.Orders: object expected");
                                message.Orders[i] = $root.Jde.Markets.Proto.Results.Order.fromObject(object.Orders[i]);
                            }
                        }
                        if (object.Trades) {
                            if (!Array.isArray(object.Trades))
                                throw TypeError(".Jde.Markets.Proto.Results.Flex.Trades: array expected");
                            message.Trades = [];
                            for (let i = 0; i < object.Trades.length; ++i) {
                                if (typeof object.Trades[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Results.Flex.Trades: object expected");
                                message.Trades[i] = $root.Jde.Markets.Proto.Results.Trade.fromObject(object.Trades[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Flex message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @static
                     * @param {Jde.Markets.Proto.Results.Flex} message Flex
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Flex.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults) {
                            object.Orders = [];
                            object.Trades = [];
                        }
                        if (options.defaults)
                            object.RequestId = 0;
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Orders && message.Orders.length) {
                            object.Orders = [];
                            for (let j = 0; j < message.Orders.length; ++j)
                                object.Orders[j] = $root.Jde.Markets.Proto.Results.Order.toObject(message.Orders[j], options);
                        }
                        if (message.Trades && message.Trades.length) {
                            object.Trades = [];
                            for (let j = 0; j < message.Trades.length; ++j)
                                object.Trades[j] = $root.Jde.Markets.Proto.Results.Trade.toObject(message.Trades[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Flex to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Flex
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Flex.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Flex;
                })();

                Results.Error = (function() {

                    /**
                     * Properties of an Error.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IError
                     * @property {number|null} [RequestId] Error RequestId
                     * @property {number|null} [Code] Error Code
                     * @property {string|null} [Message] Error Message
                     */

                    /**
                     * Constructs a new Error.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an Error.
                     * @implements IError
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IError=} [properties] Properties to set
                     */
                    function Error(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Error RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @instance
                     */
                    Error.prototype.RequestId = 0;

                    /**
                     * Error Code.
                     * @member {number} Code
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @instance
                     */
                    Error.prototype.Code = 0;

                    /**
                     * Error Message.
                     * @member {string} Message
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @instance
                     */
                    Error.prototype.Message = "";

                    /**
                     * Creates a new Error instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {Jde.Markets.Proto.Results.IError=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Error} Error instance
                     */
                    Error.create = function create(properties) {
                        return new Error(properties);
                    };

                    /**
                     * Encodes the specified Error message. Does not implicitly {@link Jde.Markets.Proto.Results.Error.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {Jde.Markets.Proto.Results.IError} message Error message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Error.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.Code != null && message.hasOwnProperty("Code"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Code);
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.Message);
                        return writer;
                    };

                    /**
                     * Encodes the specified Error message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Error.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {Jde.Markets.Proto.Results.IError} message Error message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Error.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an Error message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Error} Error
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Error.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Error();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.Code = reader.int32();
                                break;
                            case 3:
                                message.Message = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an Error message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Error} Error
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Error.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an Error message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Error.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Code != null && message.hasOwnProperty("Code"))
                            if (!$util.isInteger(message.Code))
                                return "Code: integer expected";
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            if (!$util.isString(message.Message))
                                return "Message: string expected";
                        return null;
                    };

                    /**
                     * Creates an Error message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Error} Error
                     */
                    Error.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Error)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Error();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.Code != null)
                            message.Code = object.Code | 0;
                        if (object.Message != null)
                            message.Message = String(object.Message);
                        return message;
                    };

                    /**
                     * Creates a plain object from an Error message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @static
                     * @param {Jde.Markets.Proto.Results.Error} message Error
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Error.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.Code = 0;
                            object.Message = "";
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Code != null && message.hasOwnProperty("Code"))
                            object.Code = message.Code;
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            object.Message = message.Message;
                        return object;
                    };

                    /**
                     * Converts this Error to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Error
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Error.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Error;
                })();

                Results.Option = (function() {

                    /**
                     * Properties of an Option.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IOption
                     * @property {number|null} [ContractId] Option ContractId
                     * @property {number|null} [Strike] Option Strike
                     * @property {number|null} [Bid] Option Bid
                     * @property {number|null} [Ask] Option Ask
                     * @property {number|null} [Last] Option Last
                     * @property {number|null} [Volume] Option Volume
                     * @property {number|null} [OpenInterest] Option OpenInterest
                     * @property {number|null} [OIChange] Option OIChange
                     * @property {number|null} [PreviousPrice] Option PreviousPrice
                     */

                    /**
                     * Constructs a new Option.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an Option.
                     * @implements IOption
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IOption=} [properties] Properties to set
                     */
                    function Option(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Option ContractId.
                     * @member {number} ContractId
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.ContractId = 0;

                    /**
                     * Option Strike.
                     * @member {number} Strike
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.Strike = 0;

                    /**
                     * Option Bid.
                     * @member {number} Bid
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.Bid = 0;

                    /**
                     * Option Ask.
                     * @member {number} Ask
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.Ask = 0;

                    /**
                     * Option Last.
                     * @member {number} Last
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.Last = 0;

                    /**
                     * Option Volume.
                     * @member {number} Volume
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.Volume = 0;

                    /**
                     * Option OpenInterest.
                     * @member {number} OpenInterest
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.OpenInterest = 0;

                    /**
                     * Option OIChange.
                     * @member {number} OIChange
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.OIChange = 0;

                    /**
                     * Option PreviousPrice.
                     * @member {number} PreviousPrice
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     */
                    Option.prototype.PreviousPrice = 0;

                    /**
                     * Creates a new Option instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOption=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Option} Option instance
                     */
                    Option.create = function create(properties) {
                        return new Option(properties);
                    };

                    /**
                     * Encodes the specified Option message. Does not implicitly {@link Jde.Markets.Proto.Results.Option.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOption} message Option message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Option.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ContractId);
                        if (message.Strike != null && message.hasOwnProperty("Strike"))
                            writer.uint32(/* id 2, wireType 5 =*/21).float(message.Strike);
                        if (message.Bid != null && message.hasOwnProperty("Bid"))
                            writer.uint32(/* id 3, wireType 5 =*/29).float(message.Bid);
                        if (message.Ask != null && message.hasOwnProperty("Ask"))
                            writer.uint32(/* id 4, wireType 5 =*/37).float(message.Ask);
                        if (message.Last != null && message.hasOwnProperty("Last"))
                            writer.uint32(/* id 5, wireType 5 =*/45).float(message.Last);
                        if (message.Volume != null && message.hasOwnProperty("Volume"))
                            writer.uint32(/* id 6, wireType 5 =*/53).float(message.Volume);
                        if (message.OpenInterest != null && message.hasOwnProperty("OpenInterest"))
                            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.OpenInterest);
                        if (message.OIChange != null && message.hasOwnProperty("OIChange"))
                            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.OIChange);
                        if (message.PreviousPrice != null && message.hasOwnProperty("PreviousPrice"))
                            writer.uint32(/* id 9, wireType 5 =*/77).float(message.PreviousPrice);
                        return writer;
                    };

                    /**
                     * Encodes the specified Option message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Option.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOption} message Option message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Option.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an Option message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Option} Option
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Option.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Option();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.ContractId = reader.uint32();
                                break;
                            case 2:
                                message.Strike = reader.float();
                                break;
                            case 3:
                                message.Bid = reader.float();
                                break;
                            case 4:
                                message.Ask = reader.float();
                                break;
                            case 5:
                                message.Last = reader.float();
                                break;
                            case 6:
                                message.Volume = reader.float();
                                break;
                            case 7:
                                message.OpenInterest = reader.uint32();
                                break;
                            case 8:
                                message.OIChange = reader.int32();
                                break;
                            case 9:
                                message.PreviousPrice = reader.float();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an Option message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Option} Option
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Option.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an Option message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Option.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            if (!$util.isInteger(message.ContractId))
                                return "ContractId: integer expected";
                        if (message.Strike != null && message.hasOwnProperty("Strike"))
                            if (typeof message.Strike !== "number")
                                return "Strike: number expected";
                        if (message.Bid != null && message.hasOwnProperty("Bid"))
                            if (typeof message.Bid !== "number")
                                return "Bid: number expected";
                        if (message.Ask != null && message.hasOwnProperty("Ask"))
                            if (typeof message.Ask !== "number")
                                return "Ask: number expected";
                        if (message.Last != null && message.hasOwnProperty("Last"))
                            if (typeof message.Last !== "number")
                                return "Last: number expected";
                        if (message.Volume != null && message.hasOwnProperty("Volume"))
                            if (typeof message.Volume !== "number")
                                return "Volume: number expected";
                        if (message.OpenInterest != null && message.hasOwnProperty("OpenInterest"))
                            if (!$util.isInteger(message.OpenInterest))
                                return "OpenInterest: integer expected";
                        if (message.OIChange != null && message.hasOwnProperty("OIChange"))
                            if (!$util.isInteger(message.OIChange))
                                return "OIChange: integer expected";
                        if (message.PreviousPrice != null && message.hasOwnProperty("PreviousPrice"))
                            if (typeof message.PreviousPrice !== "number")
                                return "PreviousPrice: number expected";
                        return null;
                    };

                    /**
                     * Creates an Option message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Option} Option
                     */
                    Option.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Option)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Option();
                        if (object.ContractId != null)
                            message.ContractId = object.ContractId >>> 0;
                        if (object.Strike != null)
                            message.Strike = Number(object.Strike);
                        if (object.Bid != null)
                            message.Bid = Number(object.Bid);
                        if (object.Ask != null)
                            message.Ask = Number(object.Ask);
                        if (object.Last != null)
                            message.Last = Number(object.Last);
                        if (object.Volume != null)
                            message.Volume = Number(object.Volume);
                        if (object.OpenInterest != null)
                            message.OpenInterest = object.OpenInterest >>> 0;
                        if (object.OIChange != null)
                            message.OIChange = object.OIChange | 0;
                        if (object.PreviousPrice != null)
                            message.PreviousPrice = Number(object.PreviousPrice);
                        return message;
                    };

                    /**
                     * Creates a plain object from an Option message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @static
                     * @param {Jde.Markets.Proto.Results.Option} message Option
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Option.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.ContractId = 0;
                            object.Strike = 0;
                            object.Bid = 0;
                            object.Ask = 0;
                            object.Last = 0;
                            object.Volume = 0;
                            object.OpenInterest = 0;
                            object.OIChange = 0;
                            object.PreviousPrice = 0;
                        }
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            object.ContractId = message.ContractId;
                        if (message.Strike != null && message.hasOwnProperty("Strike"))
                            object.Strike = options.json && !isFinite(message.Strike) ? String(message.Strike) : message.Strike;
                        if (message.Bid != null && message.hasOwnProperty("Bid"))
                            object.Bid = options.json && !isFinite(message.Bid) ? String(message.Bid) : message.Bid;
                        if (message.Ask != null && message.hasOwnProperty("Ask"))
                            object.Ask = options.json && !isFinite(message.Ask) ? String(message.Ask) : message.Ask;
                        if (message.Last != null && message.hasOwnProperty("Last"))
                            object.Last = options.json && !isFinite(message.Last) ? String(message.Last) : message.Last;
                        if (message.Volume != null && message.hasOwnProperty("Volume"))
                            object.Volume = options.json && !isFinite(message.Volume) ? String(message.Volume) : message.Volume;
                        if (message.OpenInterest != null && message.hasOwnProperty("OpenInterest"))
                            object.OpenInterest = message.OpenInterest;
                        if (message.OIChange != null && message.hasOwnProperty("OIChange"))
                            object.OIChange = message.OIChange;
                        if (message.PreviousPrice != null && message.hasOwnProperty("PreviousPrice"))
                            object.PreviousPrice = options.json && !isFinite(message.PreviousPrice) ? String(message.PreviousPrice) : message.PreviousPrice;
                        return object;
                    };

                    /**
                     * Converts this Option to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Option
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Option.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Option;
                })();

                Results.OptionDay = (function() {

                    /**
                     * Properties of an OptionDay.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IOptionDay
                     * @property {boolean|null} [IsCall] OptionDay IsCall
                     * @property {number|null} [ExpirationDays] OptionDay ExpirationDays
                     * @property {Array.<Jde.Markets.Proto.Results.IOption>|null} [Values] OptionDay Values
                     */

                    /**
                     * Constructs a new OptionDay.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an OptionDay.
                     * @implements IOptionDay
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IOptionDay=} [properties] Properties to set
                     */
                    function OptionDay(properties) {
                        this.Values = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * OptionDay IsCall.
                     * @member {boolean} IsCall
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @instance
                     */
                    OptionDay.prototype.IsCall = false;

                    /**
                     * OptionDay ExpirationDays.
                     * @member {number} ExpirationDays
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @instance
                     */
                    OptionDay.prototype.ExpirationDays = 0;

                    /**
                     * OptionDay Values.
                     * @member {Array.<Jde.Markets.Proto.Results.IOption>} Values
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @instance
                     */
                    OptionDay.prototype.Values = $util.emptyArray;

                    /**
                     * Creates a new OptionDay instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOptionDay=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.OptionDay} OptionDay instance
                     */
                    OptionDay.create = function create(properties) {
                        return new OptionDay(properties);
                    };

                    /**
                     * Encodes the specified OptionDay message. Does not implicitly {@link Jde.Markets.Proto.Results.OptionDay.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOptionDay} message OptionDay message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OptionDay.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.IsCall != null && message.hasOwnProperty("IsCall"))
                            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.IsCall);
                        if (message.ExpirationDays != null && message.hasOwnProperty("ExpirationDays"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.ExpirationDays);
                        if (message.Values != null && message.Values.length)
                            for (let i = 0; i < message.Values.length; ++i)
                                $root.Jde.Markets.Proto.Results.Option.encode(message.Values[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified OptionDay message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.OptionDay.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOptionDay} message OptionDay message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OptionDay.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an OptionDay message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.OptionDay} OptionDay
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OptionDay.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.OptionDay();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.IsCall = reader.bool();
                                break;
                            case 2:
                                message.ExpirationDays = reader.uint32();
                                break;
                            case 3:
                                if (!(message.Values && message.Values.length))
                                    message.Values = [];
                                message.Values.push($root.Jde.Markets.Proto.Results.Option.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an OptionDay message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.OptionDay} OptionDay
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OptionDay.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an OptionDay message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    OptionDay.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.IsCall != null && message.hasOwnProperty("IsCall"))
                            if (typeof message.IsCall !== "boolean")
                                return "IsCall: boolean expected";
                        if (message.ExpirationDays != null && message.hasOwnProperty("ExpirationDays"))
                            if (!$util.isInteger(message.ExpirationDays))
                                return "ExpirationDays: integer expected";
                        if (message.Values != null && message.hasOwnProperty("Values")) {
                            if (!Array.isArray(message.Values))
                                return "Values: array expected";
                            for (let i = 0; i < message.Values.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Results.Option.verify(message.Values[i]);
                                if (error)
                                    return "Values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates an OptionDay message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.OptionDay} OptionDay
                     */
                    OptionDay.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.OptionDay)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.OptionDay();
                        if (object.IsCall != null)
                            message.IsCall = Boolean(object.IsCall);
                        if (object.ExpirationDays != null)
                            message.ExpirationDays = object.ExpirationDays >>> 0;
                        if (object.Values) {
                            if (!Array.isArray(object.Values))
                                throw TypeError(".Jde.Markets.Proto.Results.OptionDay.Values: array expected");
                            message.Values = [];
                            for (let i = 0; i < object.Values.length; ++i) {
                                if (typeof object.Values[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Results.OptionDay.Values: object expected");
                                message.Values[i] = $root.Jde.Markets.Proto.Results.Option.fromObject(object.Values[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an OptionDay message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @static
                     * @param {Jde.Markets.Proto.Results.OptionDay} message OptionDay
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    OptionDay.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Values = [];
                        if (options.defaults) {
                            object.IsCall = false;
                            object.ExpirationDays = 0;
                        }
                        if (message.IsCall != null && message.hasOwnProperty("IsCall"))
                            object.IsCall = message.IsCall;
                        if (message.ExpirationDays != null && message.hasOwnProperty("ExpirationDays"))
                            object.ExpirationDays = message.ExpirationDays;
                        if (message.Values && message.Values.length) {
                            object.Values = [];
                            for (let j = 0; j < message.Values.length; ++j)
                                object.Values[j] = $root.Jde.Markets.Proto.Results.Option.toObject(message.Values[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this OptionDay to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.OptionDay
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    OptionDay.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return OptionDay;
                })();

                Results.OptionValues = (function() {

                    /**
                     * Properties of an OptionValues.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IOptionValues
                     * @property {number|null} [RequestId] OptionValues RequestId
                     * @property {Array.<Jde.Markets.Proto.Results.IOptionDay>|null} [OptionDays] OptionValues OptionDays
                     */

                    /**
                     * Constructs a new OptionValues.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents an OptionValues.
                     * @implements IOptionValues
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IOptionValues=} [properties] Properties to set
                     */
                    function OptionValues(properties) {
                        this.OptionDays = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * OptionValues RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @instance
                     */
                    OptionValues.prototype.RequestId = 0;

                    /**
                     * OptionValues OptionDays.
                     * @member {Array.<Jde.Markets.Proto.Results.IOptionDay>} OptionDays
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @instance
                     */
                    OptionValues.prototype.OptionDays = $util.emptyArray;

                    /**
                     * Creates a new OptionValues instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOptionValues=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.OptionValues} OptionValues instance
                     */
                    OptionValues.create = function create(properties) {
                        return new OptionValues(properties);
                    };

                    /**
                     * Encodes the specified OptionValues message. Does not implicitly {@link Jde.Markets.Proto.Results.OptionValues.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOptionValues} message OptionValues message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OptionValues.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RequestId);
                        if (message.OptionDays != null && message.OptionDays.length)
                            for (let i = 0; i < message.OptionDays.length; ++i)
                                $root.Jde.Markets.Proto.Results.OptionDay.encode(message.OptionDays[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified OptionValues message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.OptionValues.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {Jde.Markets.Proto.Results.IOptionValues} message OptionValues message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OptionValues.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an OptionValues message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.OptionValues} OptionValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OptionValues.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.OptionValues();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.uint32();
                                break;
                            case 2:
                                if (!(message.OptionDays && message.OptionDays.length))
                                    message.OptionDays = [];
                                message.OptionDays.push($root.Jde.Markets.Proto.Results.OptionDay.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an OptionValues message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.OptionValues} OptionValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OptionValues.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an OptionValues message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    OptionValues.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.OptionDays != null && message.hasOwnProperty("OptionDays")) {
                            if (!Array.isArray(message.OptionDays))
                                return "OptionDays: array expected";
                            for (let i = 0; i < message.OptionDays.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Results.OptionDay.verify(message.OptionDays[i]);
                                if (error)
                                    return "OptionDays." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates an OptionValues message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.OptionValues} OptionValues
                     */
                    OptionValues.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.OptionValues)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.OptionValues();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId >>> 0;
                        if (object.OptionDays) {
                            if (!Array.isArray(object.OptionDays))
                                throw TypeError(".Jde.Markets.Proto.Results.OptionValues.OptionDays: array expected");
                            message.OptionDays = [];
                            for (let i = 0; i < object.OptionDays.length; ++i) {
                                if (typeof object.OptionDays[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Results.OptionValues.OptionDays: object expected");
                                message.OptionDays[i] = $root.Jde.Markets.Proto.Results.OptionDay.fromObject(object.OptionDays[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an OptionValues message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @static
                     * @param {Jde.Markets.Proto.Results.OptionValues} message OptionValues
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    OptionValues.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.OptionDays = [];
                        if (options.defaults)
                            object.RequestId = 0;
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.OptionDays && message.OptionDays.length) {
                            object.OptionDays = [];
                            for (let j = 0; j < message.OptionDays.length; ++j)
                                object.OptionDays[j] = $root.Jde.Markets.Proto.Results.OptionDay.toObject(message.OptionDays[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this OptionValues to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.OptionValues
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    OptionValues.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return OptionValues;
                })();

                Results.MessageUnion = (function() {

                    /**
                     * Properties of a MessageUnion.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface IMessageUnion
                     * @property {Jde.Markets.Proto.Results.IPosition|null} [Position] MessageUnion Position
                     * @property {Jde.Markets.Proto.IContract|null} [Contract] MessageUnion Contract
                     * @property {Jde.Markets.Proto.Results.IMessageValue|null} [Message] MessageUnion Message
                     * @property {Jde.Markets.Proto.Results.IAccountList|null} [AccountList] MessageUnion AccountList
                     * @property {Jde.Markets.Proto.Results.IAccountUpdate|null} [AccountUpdate] MessageUnion AccountUpdate
                     * @property {Jde.Markets.Proto.Results.IAccountUpdateMulti|null} [AccountUpdateMulti] MessageUnion AccountUpdateMulti
                     * @property {Jde.Markets.Proto.Results.IPortfolioUpdate|null} [PortfolioUpdate] MessageUnion PortfolioUpdate
                     * @property {Jde.Markets.Proto.Results.ITickGeneric|null} [TickGeneric] MessageUnion TickGeneric
                     * @property {Jde.Markets.Proto.Results.ITickPrice|null} [TickPrice] MessageUnion TickPrice
                     * @property {Jde.Markets.Proto.Results.ITickSize|null} [TickSize] MessageUnion TickSize
                     * @property {Jde.Markets.Proto.Results.ITickString|null} [TickString] MessageUnion TickString
                     * @property {Jde.Markets.Proto.Results.IContractDetails|null} [ContractDetails] MessageUnion ContractDetails
                     * @property {Jde.Markets.Proto.Results.IError|null} [Error] MessageUnion Error
                     * @property {Jde.Markets.Proto.Results.IOptionValues|null} [Options] MessageUnion Options
                     * @property {Jde.Markets.Proto.Results.IHistoricalData|null} [HistoricalData] MessageUnion HistoricalData
                     * @property {Jde.Markets.Proto.Results.IStringResult|null} [StringResult] MessageUnion StringResult
                     * @property {Jde.Markets.Proto.Results.IFlex|null} [Flex] MessageUnion Flex
                     */

                    /**
                     * Constructs a new MessageUnion.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a MessageUnion.
                     * @implements IMessageUnion
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.IMessageUnion=} [properties] Properties to set
                     */
                    function MessageUnion(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * MessageUnion Position.
                     * @member {Jde.Markets.Proto.Results.IPosition|null|undefined} Position
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Position = null;

                    /**
                     * MessageUnion Contract.
                     * @member {Jde.Markets.Proto.IContract|null|undefined} Contract
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Contract = null;

                    /**
                     * MessageUnion Message.
                     * @member {Jde.Markets.Proto.Results.IMessageValue|null|undefined} Message
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Message = null;

                    /**
                     * MessageUnion AccountList.
                     * @member {Jde.Markets.Proto.Results.IAccountList|null|undefined} AccountList
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.AccountList = null;

                    /**
                     * MessageUnion AccountUpdate.
                     * @member {Jde.Markets.Proto.Results.IAccountUpdate|null|undefined} AccountUpdate
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.AccountUpdate = null;

                    /**
                     * MessageUnion AccountUpdateMulti.
                     * @member {Jde.Markets.Proto.Results.IAccountUpdateMulti|null|undefined} AccountUpdateMulti
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.AccountUpdateMulti = null;

                    /**
                     * MessageUnion PortfolioUpdate.
                     * @member {Jde.Markets.Proto.Results.IPortfolioUpdate|null|undefined} PortfolioUpdate
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.PortfolioUpdate = null;

                    /**
                     * MessageUnion TickGeneric.
                     * @member {Jde.Markets.Proto.Results.ITickGeneric|null|undefined} TickGeneric
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.TickGeneric = null;

                    /**
                     * MessageUnion TickPrice.
                     * @member {Jde.Markets.Proto.Results.ITickPrice|null|undefined} TickPrice
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.TickPrice = null;

                    /**
                     * MessageUnion TickSize.
                     * @member {Jde.Markets.Proto.Results.ITickSize|null|undefined} TickSize
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.TickSize = null;

                    /**
                     * MessageUnion TickString.
                     * @member {Jde.Markets.Proto.Results.ITickString|null|undefined} TickString
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.TickString = null;

                    /**
                     * MessageUnion ContractDetails.
                     * @member {Jde.Markets.Proto.Results.IContractDetails|null|undefined} ContractDetails
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.ContractDetails = null;

                    /**
                     * MessageUnion Error.
                     * @member {Jde.Markets.Proto.Results.IError|null|undefined} Error
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Error = null;

                    /**
                     * MessageUnion Options.
                     * @member {Jde.Markets.Proto.Results.IOptionValues|null|undefined} Options
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Options = null;

                    /**
                     * MessageUnion HistoricalData.
                     * @member {Jde.Markets.Proto.Results.IHistoricalData|null|undefined} HistoricalData
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.HistoricalData = null;

                    /**
                     * MessageUnion StringResult.
                     * @member {Jde.Markets.Proto.Results.IStringResult|null|undefined} StringResult
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.StringResult = null;

                    /**
                     * MessageUnion Flex.
                     * @member {Jde.Markets.Proto.Results.IFlex|null|undefined} Flex
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Flex = null;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * MessageUnion Value.
                     * @member {"Position"|"Contract"|"Message"|"AccountList"|"AccountUpdate"|"AccountUpdateMulti"|"PortfolioUpdate"|"TickGeneric"|"TickPrice"|"TickSize"|"TickString"|"ContractDetails"|"Error"|"Options"|"HistoricalData"|"StringResult"|"Flex"|undefined} Value
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     */
                    Object.defineProperty(MessageUnion.prototype, "Value", {
                        get: $util.oneOfGetter($oneOfFields = ["Position", "Contract", "Message", "AccountList", "AccountUpdate", "AccountUpdateMulti", "PortfolioUpdate", "TickGeneric", "TickPrice", "TickSize", "TickString", "ContractDetails", "Error", "Options", "HistoricalData", "StringResult", "Flex"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new MessageUnion instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {Jde.Markets.Proto.Results.IMessageUnion=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.MessageUnion} MessageUnion instance
                     */
                    MessageUnion.create = function create(properties) {
                        return new MessageUnion(properties);
                    };

                    /**
                     * Encodes the specified MessageUnion message. Does not implicitly {@link Jde.Markets.Proto.Results.MessageUnion.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {Jde.Markets.Proto.Results.IMessageUnion} message MessageUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageUnion.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Position != null && message.hasOwnProperty("Position"))
                            $root.Jde.Markets.Proto.Results.Position.encode(message.Position, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            $root.Jde.Markets.Proto.Contract.encode(message.Contract, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            $root.Jde.Markets.Proto.Results.MessageValue.encode(message.Message, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.AccountList != null && message.hasOwnProperty("AccountList"))
                            $root.Jde.Markets.Proto.Results.AccountList.encode(message.AccountList, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.AccountUpdate != null && message.hasOwnProperty("AccountUpdate"))
                            $root.Jde.Markets.Proto.Results.AccountUpdate.encode(message.AccountUpdate, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.AccountUpdateMulti != null && message.hasOwnProperty("AccountUpdateMulti"))
                            $root.Jde.Markets.Proto.Results.AccountUpdateMulti.encode(message.AccountUpdateMulti, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.PortfolioUpdate != null && message.hasOwnProperty("PortfolioUpdate"))
                            $root.Jde.Markets.Proto.Results.PortfolioUpdate.encode(message.PortfolioUpdate, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                        if (message.TickGeneric != null && message.hasOwnProperty("TickGeneric"))
                            $root.Jde.Markets.Proto.Results.TickGeneric.encode(message.TickGeneric, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                        if (message.TickPrice != null && message.hasOwnProperty("TickPrice"))
                            $root.Jde.Markets.Proto.Results.TickPrice.encode(message.TickPrice, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                        if (message.TickSize != null && message.hasOwnProperty("TickSize"))
                            $root.Jde.Markets.Proto.Results.TickSize.encode(message.TickSize, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                        if (message.TickString != null && message.hasOwnProperty("TickString"))
                            $root.Jde.Markets.Proto.Results.TickString.encode(message.TickString, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                        if (message.ContractDetails != null && message.hasOwnProperty("ContractDetails"))
                            $root.Jde.Markets.Proto.Results.ContractDetails.encode(message.ContractDetails, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                        if (message.Error != null && message.hasOwnProperty("Error"))
                            $root.Jde.Markets.Proto.Results.Error.encode(message.Error, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                        if (message.Options != null && message.hasOwnProperty("Options"))
                            $root.Jde.Markets.Proto.Results.OptionValues.encode(message.Options, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                        if (message.HistoricalData != null && message.hasOwnProperty("HistoricalData"))
                            $root.Jde.Markets.Proto.Results.HistoricalData.encode(message.HistoricalData, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                        if (message.StringResult != null && message.hasOwnProperty("StringResult"))
                            $root.Jde.Markets.Proto.Results.StringResult.encode(message.StringResult, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                        if (message.Flex != null && message.hasOwnProperty("Flex"))
                            $root.Jde.Markets.Proto.Results.Flex.encode(message.Flex, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified MessageUnion message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.MessageUnion.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {Jde.Markets.Proto.Results.IMessageUnion} message MessageUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageUnion.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.MessageUnion} MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MessageUnion.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.MessageUnion();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Position = $root.Jde.Markets.Proto.Results.Position.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.Contract = $root.Jde.Markets.Proto.Contract.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.Message = $root.Jde.Markets.Proto.Results.MessageValue.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.AccountList = $root.Jde.Markets.Proto.Results.AccountList.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.AccountUpdate = $root.Jde.Markets.Proto.Results.AccountUpdate.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.AccountUpdateMulti = $root.Jde.Markets.Proto.Results.AccountUpdateMulti.decode(reader, reader.uint32());
                                break;
                            case 7:
                                message.PortfolioUpdate = $root.Jde.Markets.Proto.Results.PortfolioUpdate.decode(reader, reader.uint32());
                                break;
                            case 8:
                                message.TickGeneric = $root.Jde.Markets.Proto.Results.TickGeneric.decode(reader, reader.uint32());
                                break;
                            case 9:
                                message.TickPrice = $root.Jde.Markets.Proto.Results.TickPrice.decode(reader, reader.uint32());
                                break;
                            case 10:
                                message.TickSize = $root.Jde.Markets.Proto.Results.TickSize.decode(reader, reader.uint32());
                                break;
                            case 11:
                                message.TickString = $root.Jde.Markets.Proto.Results.TickString.decode(reader, reader.uint32());
                                break;
                            case 12:
                                message.ContractDetails = $root.Jde.Markets.Proto.Results.ContractDetails.decode(reader, reader.uint32());
                                break;
                            case 13:
                                message.Error = $root.Jde.Markets.Proto.Results.Error.decode(reader, reader.uint32());
                                break;
                            case 14:
                                message.Options = $root.Jde.Markets.Proto.Results.OptionValues.decode(reader, reader.uint32());
                                break;
                            case 15:
                                message.HistoricalData = $root.Jde.Markets.Proto.Results.HistoricalData.decode(reader, reader.uint32());
                                break;
                            case 16:
                                message.StringResult = $root.Jde.Markets.Proto.Results.StringResult.decode(reader, reader.uint32());
                                break;
                            case 17:
                                message.Flex = $root.Jde.Markets.Proto.Results.Flex.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.MessageUnion} MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MessageUnion.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a MessageUnion message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MessageUnion.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        let properties = {};
                        if (message.Position != null && message.hasOwnProperty("Position")) {
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.Position.verify(message.Position);
                                if (error)
                                    return "Position." + error;
                            }
                        }
                        if (message.Contract != null && message.hasOwnProperty("Contract")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Contract.verify(message.Contract);
                                if (error)
                                    return "Contract." + error;
                            }
                        }
                        if (message.Message != null && message.hasOwnProperty("Message")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.MessageValue.verify(message.Message);
                                if (error)
                                    return "Message." + error;
                            }
                        }
                        if (message.AccountList != null && message.hasOwnProperty("AccountList")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.AccountList.verify(message.AccountList);
                                if (error)
                                    return "AccountList." + error;
                            }
                        }
                        if (message.AccountUpdate != null && message.hasOwnProperty("AccountUpdate")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.AccountUpdate.verify(message.AccountUpdate);
                                if (error)
                                    return "AccountUpdate." + error;
                            }
                        }
                        if (message.AccountUpdateMulti != null && message.hasOwnProperty("AccountUpdateMulti")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.AccountUpdateMulti.verify(message.AccountUpdateMulti);
                                if (error)
                                    return "AccountUpdateMulti." + error;
                            }
                        }
                        if (message.PortfolioUpdate != null && message.hasOwnProperty("PortfolioUpdate")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.PortfolioUpdate.verify(message.PortfolioUpdate);
                                if (error)
                                    return "PortfolioUpdate." + error;
                            }
                        }
                        if (message.TickGeneric != null && message.hasOwnProperty("TickGeneric")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.TickGeneric.verify(message.TickGeneric);
                                if (error)
                                    return "TickGeneric." + error;
                            }
                        }
                        if (message.TickPrice != null && message.hasOwnProperty("TickPrice")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.TickPrice.verify(message.TickPrice);
                                if (error)
                                    return "TickPrice." + error;
                            }
                        }
                        if (message.TickSize != null && message.hasOwnProperty("TickSize")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.TickSize.verify(message.TickSize);
                                if (error)
                                    return "TickSize." + error;
                            }
                        }
                        if (message.TickString != null && message.hasOwnProperty("TickString")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.TickString.verify(message.TickString);
                                if (error)
                                    return "TickString." + error;
                            }
                        }
                        if (message.ContractDetails != null && message.hasOwnProperty("ContractDetails")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.ContractDetails.verify(message.ContractDetails);
                                if (error)
                                    return "ContractDetails." + error;
                            }
                        }
                        if (message.Error != null && message.hasOwnProperty("Error")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.Error.verify(message.Error);
                                if (error)
                                    return "Error." + error;
                            }
                        }
                        if (message.Options != null && message.hasOwnProperty("Options")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.OptionValues.verify(message.Options);
                                if (error)
                                    return "Options." + error;
                            }
                        }
                        if (message.HistoricalData != null && message.hasOwnProperty("HistoricalData")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.HistoricalData.verify(message.HistoricalData);
                                if (error)
                                    return "HistoricalData." + error;
                            }
                        }
                        if (message.StringResult != null && message.hasOwnProperty("StringResult")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.StringResult.verify(message.StringResult);
                                if (error)
                                    return "StringResult." + error;
                            }
                        }
                        if (message.Flex != null && message.hasOwnProperty("Flex")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Results.Flex.verify(message.Flex);
                                if (error)
                                    return "Flex." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a MessageUnion message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.MessageUnion} MessageUnion
                     */
                    MessageUnion.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.MessageUnion)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.MessageUnion();
                        if (object.Position != null) {
                            if (typeof object.Position !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.Position: object expected");
                            message.Position = $root.Jde.Markets.Proto.Results.Position.fromObject(object.Position);
                        }
                        if (object.Contract != null) {
                            if (typeof object.Contract !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.Contract: object expected");
                            message.Contract = $root.Jde.Markets.Proto.Contract.fromObject(object.Contract);
                        }
                        if (object.Message != null) {
                            if (typeof object.Message !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.Message: object expected");
                            message.Message = $root.Jde.Markets.Proto.Results.MessageValue.fromObject(object.Message);
                        }
                        if (object.AccountList != null) {
                            if (typeof object.AccountList !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.AccountList: object expected");
                            message.AccountList = $root.Jde.Markets.Proto.Results.AccountList.fromObject(object.AccountList);
                        }
                        if (object.AccountUpdate != null) {
                            if (typeof object.AccountUpdate !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.AccountUpdate: object expected");
                            message.AccountUpdate = $root.Jde.Markets.Proto.Results.AccountUpdate.fromObject(object.AccountUpdate);
                        }
                        if (object.AccountUpdateMulti != null) {
                            if (typeof object.AccountUpdateMulti !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.AccountUpdateMulti: object expected");
                            message.AccountUpdateMulti = $root.Jde.Markets.Proto.Results.AccountUpdateMulti.fromObject(object.AccountUpdateMulti);
                        }
                        if (object.PortfolioUpdate != null) {
                            if (typeof object.PortfolioUpdate !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.PortfolioUpdate: object expected");
                            message.PortfolioUpdate = $root.Jde.Markets.Proto.Results.PortfolioUpdate.fromObject(object.PortfolioUpdate);
                        }
                        if (object.TickGeneric != null) {
                            if (typeof object.TickGeneric !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.TickGeneric: object expected");
                            message.TickGeneric = $root.Jde.Markets.Proto.Results.TickGeneric.fromObject(object.TickGeneric);
                        }
                        if (object.TickPrice != null) {
                            if (typeof object.TickPrice !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.TickPrice: object expected");
                            message.TickPrice = $root.Jde.Markets.Proto.Results.TickPrice.fromObject(object.TickPrice);
                        }
                        if (object.TickSize != null) {
                            if (typeof object.TickSize !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.TickSize: object expected");
                            message.TickSize = $root.Jde.Markets.Proto.Results.TickSize.fromObject(object.TickSize);
                        }
                        if (object.TickString != null) {
                            if (typeof object.TickString !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.TickString: object expected");
                            message.TickString = $root.Jde.Markets.Proto.Results.TickString.fromObject(object.TickString);
                        }
                        if (object.ContractDetails != null) {
                            if (typeof object.ContractDetails !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.ContractDetails: object expected");
                            message.ContractDetails = $root.Jde.Markets.Proto.Results.ContractDetails.fromObject(object.ContractDetails);
                        }
                        if (object.Error != null) {
                            if (typeof object.Error !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.Error: object expected");
                            message.Error = $root.Jde.Markets.Proto.Results.Error.fromObject(object.Error);
                        }
                        if (object.Options != null) {
                            if (typeof object.Options !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.Options: object expected");
                            message.Options = $root.Jde.Markets.Proto.Results.OptionValues.fromObject(object.Options);
                        }
                        if (object.HistoricalData != null) {
                            if (typeof object.HistoricalData !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.HistoricalData: object expected");
                            message.HistoricalData = $root.Jde.Markets.Proto.Results.HistoricalData.fromObject(object.HistoricalData);
                        }
                        if (object.StringResult != null) {
                            if (typeof object.StringResult !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.StringResult: object expected");
                            message.StringResult = $root.Jde.Markets.Proto.Results.StringResult.fromObject(object.StringResult);
                        }
                        if (object.Flex != null) {
                            if (typeof object.Flex !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.MessageUnion.Flex: object expected");
                            message.Flex = $root.Jde.Markets.Proto.Results.Flex.fromObject(object.Flex);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a MessageUnion message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @static
                     * @param {Jde.Markets.Proto.Results.MessageUnion} message MessageUnion
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MessageUnion.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (message.Position != null && message.hasOwnProperty("Position")) {
                            object.Position = $root.Jde.Markets.Proto.Results.Position.toObject(message.Position, options);
                            if (options.oneofs)
                                object.Value = "Position";
                        }
                        if (message.Contract != null && message.hasOwnProperty("Contract")) {
                            object.Contract = $root.Jde.Markets.Proto.Contract.toObject(message.Contract, options);
                            if (options.oneofs)
                                object.Value = "Contract";
                        }
                        if (message.Message != null && message.hasOwnProperty("Message")) {
                            object.Message = $root.Jde.Markets.Proto.Results.MessageValue.toObject(message.Message, options);
                            if (options.oneofs)
                                object.Value = "Message";
                        }
                        if (message.AccountList != null && message.hasOwnProperty("AccountList")) {
                            object.AccountList = $root.Jde.Markets.Proto.Results.AccountList.toObject(message.AccountList, options);
                            if (options.oneofs)
                                object.Value = "AccountList";
                        }
                        if (message.AccountUpdate != null && message.hasOwnProperty("AccountUpdate")) {
                            object.AccountUpdate = $root.Jde.Markets.Proto.Results.AccountUpdate.toObject(message.AccountUpdate, options);
                            if (options.oneofs)
                                object.Value = "AccountUpdate";
                        }
                        if (message.AccountUpdateMulti != null && message.hasOwnProperty("AccountUpdateMulti")) {
                            object.AccountUpdateMulti = $root.Jde.Markets.Proto.Results.AccountUpdateMulti.toObject(message.AccountUpdateMulti, options);
                            if (options.oneofs)
                                object.Value = "AccountUpdateMulti";
                        }
                        if (message.PortfolioUpdate != null && message.hasOwnProperty("PortfolioUpdate")) {
                            object.PortfolioUpdate = $root.Jde.Markets.Proto.Results.PortfolioUpdate.toObject(message.PortfolioUpdate, options);
                            if (options.oneofs)
                                object.Value = "PortfolioUpdate";
                        }
                        if (message.TickGeneric != null && message.hasOwnProperty("TickGeneric")) {
                            object.TickGeneric = $root.Jde.Markets.Proto.Results.TickGeneric.toObject(message.TickGeneric, options);
                            if (options.oneofs)
                                object.Value = "TickGeneric";
                        }
                        if (message.TickPrice != null && message.hasOwnProperty("TickPrice")) {
                            object.TickPrice = $root.Jde.Markets.Proto.Results.TickPrice.toObject(message.TickPrice, options);
                            if (options.oneofs)
                                object.Value = "TickPrice";
                        }
                        if (message.TickSize != null && message.hasOwnProperty("TickSize")) {
                            object.TickSize = $root.Jde.Markets.Proto.Results.TickSize.toObject(message.TickSize, options);
                            if (options.oneofs)
                                object.Value = "TickSize";
                        }
                        if (message.TickString != null && message.hasOwnProperty("TickString")) {
                            object.TickString = $root.Jde.Markets.Proto.Results.TickString.toObject(message.TickString, options);
                            if (options.oneofs)
                                object.Value = "TickString";
                        }
                        if (message.ContractDetails != null && message.hasOwnProperty("ContractDetails")) {
                            object.ContractDetails = $root.Jde.Markets.Proto.Results.ContractDetails.toObject(message.ContractDetails, options);
                            if (options.oneofs)
                                object.Value = "ContractDetails";
                        }
                        if (message.Error != null && message.hasOwnProperty("Error")) {
                            object.Error = $root.Jde.Markets.Proto.Results.Error.toObject(message.Error, options);
                            if (options.oneofs)
                                object.Value = "Error";
                        }
                        if (message.Options != null && message.hasOwnProperty("Options")) {
                            object.Options = $root.Jde.Markets.Proto.Results.OptionValues.toObject(message.Options, options);
                            if (options.oneofs)
                                object.Value = "Options";
                        }
                        if (message.HistoricalData != null && message.hasOwnProperty("HistoricalData")) {
                            object.HistoricalData = $root.Jde.Markets.Proto.Results.HistoricalData.toObject(message.HistoricalData, options);
                            if (options.oneofs)
                                object.Value = "HistoricalData";
                        }
                        if (message.StringResult != null && message.hasOwnProperty("StringResult")) {
                            object.StringResult = $root.Jde.Markets.Proto.Results.StringResult.toObject(message.StringResult, options);
                            if (options.oneofs)
                                object.Value = "StringResult";
                        }
                        if (message.Flex != null && message.hasOwnProperty("Flex")) {
                            object.Flex = $root.Jde.Markets.Proto.Results.Flex.toObject(message.Flex, options);
                            if (options.oneofs)
                                object.Value = "Flex";
                        }
                        return object;
                    };

                    /**
                     * Converts this MessageUnion to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.MessageUnion
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MessageUnion.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return MessageUnion;
                })();

                Results.Transmission = (function() {

                    /**
                     * Properties of a Transmission.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITransmission
                     * @property {Array.<Jde.Markets.Proto.Results.IMessageUnion>|null} [Messages] Transmission Messages
                     */

                    /**
                     * Constructs a new Transmission.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a Transmission.
                     * @implements ITransmission
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITransmission=} [properties] Properties to set
                     */
                    function Transmission(properties) {
                        this.Messages = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Transmission Messages.
                     * @member {Array.<Jde.Markets.Proto.Results.IMessageUnion>} Messages
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @instance
                     */
                    Transmission.prototype.Messages = $util.emptyArray;

                    /**
                     * Creates a new Transmission instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITransmission=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.Transmission} Transmission instance
                     */
                    Transmission.create = function create(properties) {
                        return new Transmission(properties);
                    };

                    /**
                     * Encodes the specified Transmission message. Does not implicitly {@link Jde.Markets.Proto.Results.Transmission.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITransmission} message Transmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transmission.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Messages != null && message.Messages.length)
                            for (let i = 0; i < message.Messages.length; ++i)
                                $root.Jde.Markets.Proto.Results.MessageUnion.encode(message.Messages[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Transmission message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Transmission.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITransmission} message Transmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transmission.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Transmission message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.Transmission} Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Transmission.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.Transmission();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 10:
                                if (!(message.Messages && message.Messages.length))
                                    message.Messages = [];
                                message.Messages.push($root.Jde.Markets.Proto.Results.MessageUnion.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Transmission message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.Transmission} Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Transmission.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Transmission message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Transmission.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Messages != null && message.hasOwnProperty("Messages")) {
                            if (!Array.isArray(message.Messages))
                                return "Messages: array expected";
                            for (let i = 0; i < message.Messages.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Results.MessageUnion.verify(message.Messages[i]);
                                if (error)
                                    return "Messages." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Transmission message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.Transmission} Transmission
                     */
                    Transmission.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.Transmission)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.Transmission();
                        if (object.Messages) {
                            if (!Array.isArray(object.Messages))
                                throw TypeError(".Jde.Markets.Proto.Results.Transmission.Messages: array expected");
                            message.Messages = [];
                            for (let i = 0; i < object.Messages.length; ++i) {
                                if (typeof object.Messages[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Results.Transmission.Messages: object expected");
                                message.Messages[i] = $root.Jde.Markets.Proto.Results.MessageUnion.fromObject(object.Messages[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Transmission message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @static
                     * @param {Jde.Markets.Proto.Results.Transmission} message Transmission
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Transmission.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Messages = [];
                        if (message.Messages && message.Messages.length) {
                            object.Messages = [];
                            for (let j = 0; j < message.Messages.length; ++j)
                                object.Messages[j] = $root.Jde.Markets.Proto.Results.MessageUnion.toObject(message.Messages[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Transmission to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.Transmission
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Transmission.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Transmission;
                })();

                Results.TickGeneric = (function() {

                    /**
                     * Properties of a TickGeneric.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITickGeneric
                     * @property {number|null} [RequestId] TickGeneric RequestId
                     * @property {Jde.Markets.Proto.Results.ETickType|null} [TickType] TickGeneric TickType
                     * @property {number|null} [Value] TickGeneric Value
                     */

                    /**
                     * Constructs a new TickGeneric.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a TickGeneric.
                     * @implements ITickGeneric
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITickGeneric=} [properties] Properties to set
                     */
                    function TickGeneric(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TickGeneric RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @instance
                     */
                    TickGeneric.prototype.RequestId = 0;

                    /**
                     * TickGeneric TickType.
                     * @member {Jde.Markets.Proto.Results.ETickType} TickType
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @instance
                     */
                    TickGeneric.prototype.TickType = 0;

                    /**
                     * TickGeneric Value.
                     * @member {number} Value
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @instance
                     */
                    TickGeneric.prototype.Value = 0;

                    /**
                     * Creates a new TickGeneric instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickGeneric=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.TickGeneric} TickGeneric instance
                     */
                    TickGeneric.create = function create(properties) {
                        return new TickGeneric(properties);
                    };

                    /**
                     * Encodes the specified TickGeneric message. Does not implicitly {@link Jde.Markets.Proto.Results.TickGeneric.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickGeneric} message TickGeneric message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickGeneric.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TickType);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 3, wireType 1 =*/25).double(message.Value);
                        return writer;
                    };

                    /**
                     * Encodes the specified TickGeneric message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickGeneric.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickGeneric} message TickGeneric message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickGeneric.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TickGeneric message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.TickGeneric} TickGeneric
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickGeneric.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.TickGeneric();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.TickType = reader.int32();
                                break;
                            case 3:
                                message.Value = reader.double();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TickGeneric message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.TickGeneric} TickGeneric
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickGeneric.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TickGeneric message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TickGeneric.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            switch (message.TickType) {
                            default:
                                return "TickType: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 24:
                            case 25:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 32:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                            case 46:
                            case 47:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                            case 58:
                            case 59:
                            case 60:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70:
                            case 71:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 80:
                            case 81:
                            case 82:
                            case 83:
                            case 84:
                            case 85:
                            case 86:
                            case 87:
                            case 88:
                            case 89:
                            case 90:
                                break;
                            }
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (typeof message.Value !== "number")
                                return "Value: number expected";
                        return null;
                    };

                    /**
                     * Creates a TickGeneric message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.TickGeneric} TickGeneric
                     */
                    TickGeneric.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.TickGeneric)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.TickGeneric();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        switch (object.TickType) {
                        case "BidSize":
                        case 0:
                            message.TickType = 0;
                            break;
                        case "BidPrice":
                        case 1:
                            message.TickType = 1;
                            break;
                        case "AskPrice":
                        case 2:
                            message.TickType = 2;
                            break;
                        case "AskSize":
                        case 3:
                            message.TickType = 3;
                            break;
                        case "LastPrice":
                        case 4:
                            message.TickType = 4;
                            break;
                        case "LastSize":
                        case 5:
                            message.TickType = 5;
                            break;
                        case "High":
                        case 6:
                            message.TickType = 6;
                            break;
                        case "Low":
                        case 7:
                            message.TickType = 7;
                            break;
                        case "Volume":
                        case 8:
                            message.TickType = 8;
                            break;
                        case "ClosePrice":
                        case 9:
                            message.TickType = 9;
                            break;
                        case "BID_OPTION_COMPUTATION":
                        case 10:
                            message.TickType = 10;
                            break;
                        case "ASK_OPTION_COMPUTATION":
                        case 11:
                            message.TickType = 11;
                            break;
                        case "LAST_OPTION_COMPUTATION":
                        case 12:
                            message.TickType = 12;
                            break;
                        case "MODEL_OPTION":
                        case 13:
                            message.TickType = 13;
                            break;
                        case "OpenTick":
                        case 14:
                            message.TickType = 14;
                            break;
                        case "LOW_13_WEEK":
                        case 15:
                            message.TickType = 15;
                            break;
                        case "HIGH_13_WEEK":
                        case 16:
                            message.TickType = 16;
                            break;
                        case "LOW_26_WEEK":
                        case 17:
                            message.TickType = 17;
                            break;
                        case "HIGH_26_WEEK":
                        case 18:
                            message.TickType = 18;
                            break;
                        case "LOW_52_WEEK":
                        case 19:
                            message.TickType = 19;
                            break;
                        case "HIGH_52_WEEK":
                        case 20:
                            message.TickType = 20;
                            break;
                        case "AVG_VOLUME":
                        case 21:
                            message.TickType = 21;
                            break;
                        case "OPEN_INTEREST":
                        case 22:
                            message.TickType = 22;
                            break;
                        case "OPTION_HISTORICAL_VOL":
                        case 23:
                            message.TickType = 23;
                            break;
                        case "OPTION_IMPLIED_VOL":
                        case 24:
                            message.TickType = 24;
                            break;
                        case "OPTION_BID_EXCH":
                        case 25:
                            message.TickType = 25;
                            break;
                        case "OPTION_ASK_EXCH":
                        case 26:
                            message.TickType = 26;
                            break;
                        case "OPTION_CALL_OPEN_INTEREST":
                        case 27:
                            message.TickType = 27;
                            break;
                        case "OPTION_PUT_OPEN_INTEREST":
                        case 28:
                            message.TickType = 28;
                            break;
                        case "OPTION_CALL_VOLUME":
                        case 29:
                            message.TickType = 29;
                            break;
                        case "OPTION_PUT_VOLUME":
                        case 30:
                            message.TickType = 30;
                            break;
                        case "INDEX_FUTURE_PREMIUM":
                        case 31:
                            message.TickType = 31;
                            break;
                        case "BidExchange":
                        case 32:
                            message.TickType = 32;
                            break;
                        case "AskExchange":
                        case 33:
                            message.TickType = 33;
                            break;
                        case "AUCTION_VOLUME":
                        case 34:
                            message.TickType = 34;
                            break;
                        case "AUCTION_PRICE":
                        case 35:
                            message.TickType = 35;
                            break;
                        case "AUCTION_IMBALANCE":
                        case 36:
                            message.TickType = 36;
                            break;
                        case "MARK_PRICE":
                        case 37:
                            message.TickType = 37;
                            break;
                        case "BID_EFP_COMPUTATION":
                        case 38:
                            message.TickType = 38;
                            break;
                        case "ASK_EFP_COMPUTATION":
                        case 39:
                            message.TickType = 39;
                            break;
                        case "LAST_EFP_COMPUTATION":
                        case 40:
                            message.TickType = 40;
                            break;
                        case "OPEN_EFP_COMPUTATION":
                        case 41:
                            message.TickType = 41;
                            break;
                        case "HIGH_EFP_COMPUTATION":
                        case 42:
                            message.TickType = 42;
                            break;
                        case "LOW_EFP_COMPUTATION":
                        case 43:
                            message.TickType = 43;
                            break;
                        case "CLOSE_EFP_COMPUTATION":
                        case 44:
                            message.TickType = 44;
                            break;
                        case "LastTimestamp":
                        case 45:
                            message.TickType = 45;
                            break;
                        case "SHORTABLE":
                        case 46:
                            message.TickType = 46;
                            break;
                        case "FUNDAMENTAL_RATIOS":
                        case 47:
                            message.TickType = 47;
                            break;
                        case "RT_VOLUME":
                        case 48:
                            message.TickType = 48;
                            break;
                        case "Halted":
                        case 49:
                            message.TickType = 49;
                            break;
                        case "BID_YIELD":
                        case 50:
                            message.TickType = 50;
                            break;
                        case "ASK_YIELD":
                        case 51:
                            message.TickType = 51;
                            break;
                        case "LAST_YIELD":
                        case 52:
                            message.TickType = 52;
                            break;
                        case "CUST_OPTION_COMPUTATION":
                        case 53:
                            message.TickType = 53;
                            break;
                        case "TRADE_COUNT":
                        case 54:
                            message.TickType = 54;
                            break;
                        case "TRADE_RATE":
                        case 55:
                            message.TickType = 55;
                            break;
                        case "VOLUME_RATE":
                        case 56:
                            message.TickType = 56;
                            break;
                        case "LAST_RTH_TRADE":
                        case 57:
                            message.TickType = 57;
                            break;
                        case "RT_HISTORICAL_VOL":
                        case 58:
                            message.TickType = 58;
                            break;
                        case "IB_DIVIDENDS":
                        case 59:
                            message.TickType = 59;
                            break;
                        case "BOND_FACTOR_MULTIPLIER":
                        case 60:
                            message.TickType = 60;
                            break;
                        case "REGULATORY_IMBALANCE":
                        case 61:
                            message.TickType = 61;
                            break;
                        case "NEWS_TICK":
                        case 62:
                            message.TickType = 62;
                            break;
                        case "SHORT_TERM_VOLUME_3_MIN":
                        case 63:
                            message.TickType = 63;
                            break;
                        case "SHORT_TERM_VOLUME_5_MIN":
                        case 64:
                            message.TickType = 64;
                            break;
                        case "SHORT_TERM_VOLUME_10_MIN":
                        case 65:
                            message.TickType = 65;
                            break;
                        case "DELAYED_BID":
                        case 66:
                            message.TickType = 66;
                            break;
                        case "DELAYED_ASK":
                        case 67:
                            message.TickType = 67;
                            break;
                        case "DELAYED_LAST":
                        case 68:
                            message.TickType = 68;
                            break;
                        case "DELAYED_BID_SIZE":
                        case 69:
                            message.TickType = 69;
                            break;
                        case "DELAYED_ASK_SIZE":
                        case 70:
                            message.TickType = 70;
                            break;
                        case "DELAYED_LAST_SIZE":
                        case 71:
                            message.TickType = 71;
                            break;
                        case "DELAYED_HIGH":
                        case 72:
                            message.TickType = 72;
                            break;
                        case "DELAYED_LOW":
                        case 73:
                            message.TickType = 73;
                            break;
                        case "DELAYED_VOLUME":
                        case 74:
                            message.TickType = 74;
                            break;
                        case "DELAYED_CLOSE":
                        case 75:
                            message.TickType = 75;
                            break;
                        case "DELAYED_OPEN":
                        case 76:
                            message.TickType = 76;
                            break;
                        case "RT_TRD_VOLUME":
                        case 77:
                            message.TickType = 77;
                            break;
                        case "CREDITMAN_MARK_PRICE":
                        case 78:
                            message.TickType = 78;
                            break;
                        case "CREDITMAN_SLOW_MARK_PRICE":
                        case 79:
                            message.TickType = 79;
                            break;
                        case "DELAYED_BID_OPTION_COMPUTATION":
                        case 80:
                            message.TickType = 80;
                            break;
                        case "DELAYED_ASK_OPTION_COMPUTATION":
                        case 81:
                            message.TickType = 81;
                            break;
                        case "DELAYED_LAST_OPTION_COMPUTATION":
                        case 82:
                            message.TickType = 82;
                            break;
                        case "DELAYED_MODEL_OPTION_COMPUTATION":
                        case 83:
                            message.TickType = 83;
                            break;
                        case "LastExchange":
                        case 84:
                            message.TickType = 84;
                            break;
                        case "LAST_REG_TIME":
                        case 85:
                            message.TickType = 85;
                            break;
                        case "FUTURES_OPEN_INTEREST":
                        case 86:
                            message.TickType = 86;
                            break;
                        case "AVG_OPT_VOLUME":
                        case 87:
                            message.TickType = 87;
                            break;
                        case "DELAYED_LAST_TIMESTAMP":
                        case 88:
                            message.TickType = 88;
                            break;
                        case "SHORTABLE_SHARES":
                        case 89:
                            message.TickType = 89;
                            break;
                        case "NOT_SET":
                        case 90:
                            message.TickType = 90;
                            break;
                        }
                        if (object.Value != null)
                            message.Value = Number(object.Value);
                        return message;
                    };

                    /**
                     * Creates a plain object from a TickGeneric message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @static
                     * @param {Jde.Markets.Proto.Results.TickGeneric} message TickGeneric
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TickGeneric.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.TickType = options.enums === String ? "BidSize" : 0;
                            object.Value = 0;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            object.TickType = options.enums === String ? $root.Jde.Markets.Proto.Results.ETickType[message.TickType] : message.TickType;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = options.json && !isFinite(message.Value) ? String(message.Value) : message.Value;
                        return object;
                    };

                    /**
                     * Converts this TickGeneric to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.TickGeneric
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TickGeneric.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return TickGeneric;
                })();

                Results.TickAttrib = (function() {

                    /**
                     * Properties of a TickAttrib.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITickAttrib
                     * @property {boolean|null} [CanAutoExecute] TickAttrib CanAutoExecute
                     * @property {boolean|null} [PastLimit] TickAttrib PastLimit
                     * @property {boolean|null} [PreOpen] TickAttrib PreOpen
                     */

                    /**
                     * Constructs a new TickAttrib.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a TickAttrib.
                     * @implements ITickAttrib
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITickAttrib=} [properties] Properties to set
                     */
                    function TickAttrib(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TickAttrib CanAutoExecute.
                     * @member {boolean} CanAutoExecute
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @instance
                     */
                    TickAttrib.prototype.CanAutoExecute = false;

                    /**
                     * TickAttrib PastLimit.
                     * @member {boolean} PastLimit
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @instance
                     */
                    TickAttrib.prototype.PastLimit = false;

                    /**
                     * TickAttrib PreOpen.
                     * @member {boolean} PreOpen
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @instance
                     */
                    TickAttrib.prototype.PreOpen = false;

                    /**
                     * Creates a new TickAttrib instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickAttrib=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.TickAttrib} TickAttrib instance
                     */
                    TickAttrib.create = function create(properties) {
                        return new TickAttrib(properties);
                    };

                    /**
                     * Encodes the specified TickAttrib message. Does not implicitly {@link Jde.Markets.Proto.Results.TickAttrib.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickAttrib} message TickAttrib message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickAttrib.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.CanAutoExecute != null && message.hasOwnProperty("CanAutoExecute"))
                            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.CanAutoExecute);
                        if (message.PastLimit != null && message.hasOwnProperty("PastLimit"))
                            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.PastLimit);
                        if (message.PreOpen != null && message.hasOwnProperty("PreOpen"))
                            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.PreOpen);
                        return writer;
                    };

                    /**
                     * Encodes the specified TickAttrib message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickAttrib.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickAttrib} message TickAttrib message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickAttrib.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TickAttrib message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.TickAttrib} TickAttrib
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickAttrib.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.TickAttrib();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.CanAutoExecute = reader.bool();
                                break;
                            case 2:
                                message.PastLimit = reader.bool();
                                break;
                            case 3:
                                message.PreOpen = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TickAttrib message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.TickAttrib} TickAttrib
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickAttrib.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TickAttrib message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TickAttrib.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.CanAutoExecute != null && message.hasOwnProperty("CanAutoExecute"))
                            if (typeof message.CanAutoExecute !== "boolean")
                                return "CanAutoExecute: boolean expected";
                        if (message.PastLimit != null && message.hasOwnProperty("PastLimit"))
                            if (typeof message.PastLimit !== "boolean")
                                return "PastLimit: boolean expected";
                        if (message.PreOpen != null && message.hasOwnProperty("PreOpen"))
                            if (typeof message.PreOpen !== "boolean")
                                return "PreOpen: boolean expected";
                        return null;
                    };

                    /**
                     * Creates a TickAttrib message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.TickAttrib} TickAttrib
                     */
                    TickAttrib.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.TickAttrib)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.TickAttrib();
                        if (object.CanAutoExecute != null)
                            message.CanAutoExecute = Boolean(object.CanAutoExecute);
                        if (object.PastLimit != null)
                            message.PastLimit = Boolean(object.PastLimit);
                        if (object.PreOpen != null)
                            message.PreOpen = Boolean(object.PreOpen);
                        return message;
                    };

                    /**
                     * Creates a plain object from a TickAttrib message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @static
                     * @param {Jde.Markets.Proto.Results.TickAttrib} message TickAttrib
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TickAttrib.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.CanAutoExecute = false;
                            object.PastLimit = false;
                            object.PreOpen = false;
                        }
                        if (message.CanAutoExecute != null && message.hasOwnProperty("CanAutoExecute"))
                            object.CanAutoExecute = message.CanAutoExecute;
                        if (message.PastLimit != null && message.hasOwnProperty("PastLimit"))
                            object.PastLimit = message.PastLimit;
                        if (message.PreOpen != null && message.hasOwnProperty("PreOpen"))
                            object.PreOpen = message.PreOpen;
                        return object;
                    };

                    /**
                     * Converts this TickAttrib to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.TickAttrib
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TickAttrib.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return TickAttrib;
                })();

                Results.TickPrice = (function() {

                    /**
                     * Properties of a TickPrice.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITickPrice
                     * @property {number|null} [RequestId] TickPrice RequestId
                     * @property {Jde.Markets.Proto.Results.ETickType|null} [TickType] TickPrice TickType
                     * @property {number|null} [Price] TickPrice Price
                     * @property {Jde.Markets.Proto.Results.ITickAttrib|null} [Attributes] TickPrice Attributes
                     */

                    /**
                     * Constructs a new TickPrice.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a TickPrice.
                     * @implements ITickPrice
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITickPrice=} [properties] Properties to set
                     */
                    function TickPrice(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TickPrice RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @instance
                     */
                    TickPrice.prototype.RequestId = 0;

                    /**
                     * TickPrice TickType.
                     * @member {Jde.Markets.Proto.Results.ETickType} TickType
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @instance
                     */
                    TickPrice.prototype.TickType = 0;

                    /**
                     * TickPrice Price.
                     * @member {number} Price
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @instance
                     */
                    TickPrice.prototype.Price = 0;

                    /**
                     * TickPrice Attributes.
                     * @member {Jde.Markets.Proto.Results.ITickAttrib|null|undefined} Attributes
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @instance
                     */
                    TickPrice.prototype.Attributes = null;

                    /**
                     * Creates a new TickPrice instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickPrice=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.TickPrice} TickPrice instance
                     */
                    TickPrice.create = function create(properties) {
                        return new TickPrice(properties);
                    };

                    /**
                     * Encodes the specified TickPrice message. Does not implicitly {@link Jde.Markets.Proto.Results.TickPrice.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickPrice} message TickPrice message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickPrice.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TickType);
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            writer.uint32(/* id 3, wireType 1 =*/25).double(message.Price);
                        if (message.Attributes != null && message.hasOwnProperty("Attributes"))
                            $root.Jde.Markets.Proto.Results.TickAttrib.encode(message.Attributes, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified TickPrice message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickPrice.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickPrice} message TickPrice message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickPrice.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TickPrice message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.TickPrice} TickPrice
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickPrice.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.TickPrice();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.TickType = reader.int32();
                                break;
                            case 3:
                                message.Price = reader.double();
                                break;
                            case 4:
                                message.Attributes = $root.Jde.Markets.Proto.Results.TickAttrib.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TickPrice message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.TickPrice} TickPrice
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickPrice.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TickPrice message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TickPrice.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            switch (message.TickType) {
                            default:
                                return "TickType: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 24:
                            case 25:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 32:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                            case 46:
                            case 47:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                            case 58:
                            case 59:
                            case 60:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70:
                            case 71:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 80:
                            case 81:
                            case 82:
                            case 83:
                            case 84:
                            case 85:
                            case 86:
                            case 87:
                            case 88:
                            case 89:
                            case 90:
                                break;
                            }
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            if (typeof message.Price !== "number")
                                return "Price: number expected";
                        if (message.Attributes != null && message.hasOwnProperty("Attributes")) {
                            let error = $root.Jde.Markets.Proto.Results.TickAttrib.verify(message.Attributes);
                            if (error)
                                return "Attributes." + error;
                        }
                        return null;
                    };

                    /**
                     * Creates a TickPrice message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.TickPrice} TickPrice
                     */
                    TickPrice.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.TickPrice)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.TickPrice();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        switch (object.TickType) {
                        case "BidSize":
                        case 0:
                            message.TickType = 0;
                            break;
                        case "BidPrice":
                        case 1:
                            message.TickType = 1;
                            break;
                        case "AskPrice":
                        case 2:
                            message.TickType = 2;
                            break;
                        case "AskSize":
                        case 3:
                            message.TickType = 3;
                            break;
                        case "LastPrice":
                        case 4:
                            message.TickType = 4;
                            break;
                        case "LastSize":
                        case 5:
                            message.TickType = 5;
                            break;
                        case "High":
                        case 6:
                            message.TickType = 6;
                            break;
                        case "Low":
                        case 7:
                            message.TickType = 7;
                            break;
                        case "Volume":
                        case 8:
                            message.TickType = 8;
                            break;
                        case "ClosePrice":
                        case 9:
                            message.TickType = 9;
                            break;
                        case "BID_OPTION_COMPUTATION":
                        case 10:
                            message.TickType = 10;
                            break;
                        case "ASK_OPTION_COMPUTATION":
                        case 11:
                            message.TickType = 11;
                            break;
                        case "LAST_OPTION_COMPUTATION":
                        case 12:
                            message.TickType = 12;
                            break;
                        case "MODEL_OPTION":
                        case 13:
                            message.TickType = 13;
                            break;
                        case "OpenTick":
                        case 14:
                            message.TickType = 14;
                            break;
                        case "LOW_13_WEEK":
                        case 15:
                            message.TickType = 15;
                            break;
                        case "HIGH_13_WEEK":
                        case 16:
                            message.TickType = 16;
                            break;
                        case "LOW_26_WEEK":
                        case 17:
                            message.TickType = 17;
                            break;
                        case "HIGH_26_WEEK":
                        case 18:
                            message.TickType = 18;
                            break;
                        case "LOW_52_WEEK":
                        case 19:
                            message.TickType = 19;
                            break;
                        case "HIGH_52_WEEK":
                        case 20:
                            message.TickType = 20;
                            break;
                        case "AVG_VOLUME":
                        case 21:
                            message.TickType = 21;
                            break;
                        case "OPEN_INTEREST":
                        case 22:
                            message.TickType = 22;
                            break;
                        case "OPTION_HISTORICAL_VOL":
                        case 23:
                            message.TickType = 23;
                            break;
                        case "OPTION_IMPLIED_VOL":
                        case 24:
                            message.TickType = 24;
                            break;
                        case "OPTION_BID_EXCH":
                        case 25:
                            message.TickType = 25;
                            break;
                        case "OPTION_ASK_EXCH":
                        case 26:
                            message.TickType = 26;
                            break;
                        case "OPTION_CALL_OPEN_INTEREST":
                        case 27:
                            message.TickType = 27;
                            break;
                        case "OPTION_PUT_OPEN_INTEREST":
                        case 28:
                            message.TickType = 28;
                            break;
                        case "OPTION_CALL_VOLUME":
                        case 29:
                            message.TickType = 29;
                            break;
                        case "OPTION_PUT_VOLUME":
                        case 30:
                            message.TickType = 30;
                            break;
                        case "INDEX_FUTURE_PREMIUM":
                        case 31:
                            message.TickType = 31;
                            break;
                        case "BidExchange":
                        case 32:
                            message.TickType = 32;
                            break;
                        case "AskExchange":
                        case 33:
                            message.TickType = 33;
                            break;
                        case "AUCTION_VOLUME":
                        case 34:
                            message.TickType = 34;
                            break;
                        case "AUCTION_PRICE":
                        case 35:
                            message.TickType = 35;
                            break;
                        case "AUCTION_IMBALANCE":
                        case 36:
                            message.TickType = 36;
                            break;
                        case "MARK_PRICE":
                        case 37:
                            message.TickType = 37;
                            break;
                        case "BID_EFP_COMPUTATION":
                        case 38:
                            message.TickType = 38;
                            break;
                        case "ASK_EFP_COMPUTATION":
                        case 39:
                            message.TickType = 39;
                            break;
                        case "LAST_EFP_COMPUTATION":
                        case 40:
                            message.TickType = 40;
                            break;
                        case "OPEN_EFP_COMPUTATION":
                        case 41:
                            message.TickType = 41;
                            break;
                        case "HIGH_EFP_COMPUTATION":
                        case 42:
                            message.TickType = 42;
                            break;
                        case "LOW_EFP_COMPUTATION":
                        case 43:
                            message.TickType = 43;
                            break;
                        case "CLOSE_EFP_COMPUTATION":
                        case 44:
                            message.TickType = 44;
                            break;
                        case "LastTimestamp":
                        case 45:
                            message.TickType = 45;
                            break;
                        case "SHORTABLE":
                        case 46:
                            message.TickType = 46;
                            break;
                        case "FUNDAMENTAL_RATIOS":
                        case 47:
                            message.TickType = 47;
                            break;
                        case "RT_VOLUME":
                        case 48:
                            message.TickType = 48;
                            break;
                        case "Halted":
                        case 49:
                            message.TickType = 49;
                            break;
                        case "BID_YIELD":
                        case 50:
                            message.TickType = 50;
                            break;
                        case "ASK_YIELD":
                        case 51:
                            message.TickType = 51;
                            break;
                        case "LAST_YIELD":
                        case 52:
                            message.TickType = 52;
                            break;
                        case "CUST_OPTION_COMPUTATION":
                        case 53:
                            message.TickType = 53;
                            break;
                        case "TRADE_COUNT":
                        case 54:
                            message.TickType = 54;
                            break;
                        case "TRADE_RATE":
                        case 55:
                            message.TickType = 55;
                            break;
                        case "VOLUME_RATE":
                        case 56:
                            message.TickType = 56;
                            break;
                        case "LAST_RTH_TRADE":
                        case 57:
                            message.TickType = 57;
                            break;
                        case "RT_HISTORICAL_VOL":
                        case 58:
                            message.TickType = 58;
                            break;
                        case "IB_DIVIDENDS":
                        case 59:
                            message.TickType = 59;
                            break;
                        case "BOND_FACTOR_MULTIPLIER":
                        case 60:
                            message.TickType = 60;
                            break;
                        case "REGULATORY_IMBALANCE":
                        case 61:
                            message.TickType = 61;
                            break;
                        case "NEWS_TICK":
                        case 62:
                            message.TickType = 62;
                            break;
                        case "SHORT_TERM_VOLUME_3_MIN":
                        case 63:
                            message.TickType = 63;
                            break;
                        case "SHORT_TERM_VOLUME_5_MIN":
                        case 64:
                            message.TickType = 64;
                            break;
                        case "SHORT_TERM_VOLUME_10_MIN":
                        case 65:
                            message.TickType = 65;
                            break;
                        case "DELAYED_BID":
                        case 66:
                            message.TickType = 66;
                            break;
                        case "DELAYED_ASK":
                        case 67:
                            message.TickType = 67;
                            break;
                        case "DELAYED_LAST":
                        case 68:
                            message.TickType = 68;
                            break;
                        case "DELAYED_BID_SIZE":
                        case 69:
                            message.TickType = 69;
                            break;
                        case "DELAYED_ASK_SIZE":
                        case 70:
                            message.TickType = 70;
                            break;
                        case "DELAYED_LAST_SIZE":
                        case 71:
                            message.TickType = 71;
                            break;
                        case "DELAYED_HIGH":
                        case 72:
                            message.TickType = 72;
                            break;
                        case "DELAYED_LOW":
                        case 73:
                            message.TickType = 73;
                            break;
                        case "DELAYED_VOLUME":
                        case 74:
                            message.TickType = 74;
                            break;
                        case "DELAYED_CLOSE":
                        case 75:
                            message.TickType = 75;
                            break;
                        case "DELAYED_OPEN":
                        case 76:
                            message.TickType = 76;
                            break;
                        case "RT_TRD_VOLUME":
                        case 77:
                            message.TickType = 77;
                            break;
                        case "CREDITMAN_MARK_PRICE":
                        case 78:
                            message.TickType = 78;
                            break;
                        case "CREDITMAN_SLOW_MARK_PRICE":
                        case 79:
                            message.TickType = 79;
                            break;
                        case "DELAYED_BID_OPTION_COMPUTATION":
                        case 80:
                            message.TickType = 80;
                            break;
                        case "DELAYED_ASK_OPTION_COMPUTATION":
                        case 81:
                            message.TickType = 81;
                            break;
                        case "DELAYED_LAST_OPTION_COMPUTATION":
                        case 82:
                            message.TickType = 82;
                            break;
                        case "DELAYED_MODEL_OPTION_COMPUTATION":
                        case 83:
                            message.TickType = 83;
                            break;
                        case "LastExchange":
                        case 84:
                            message.TickType = 84;
                            break;
                        case "LAST_REG_TIME":
                        case 85:
                            message.TickType = 85;
                            break;
                        case "FUTURES_OPEN_INTEREST":
                        case 86:
                            message.TickType = 86;
                            break;
                        case "AVG_OPT_VOLUME":
                        case 87:
                            message.TickType = 87;
                            break;
                        case "DELAYED_LAST_TIMESTAMP":
                        case 88:
                            message.TickType = 88;
                            break;
                        case "SHORTABLE_SHARES":
                        case 89:
                            message.TickType = 89;
                            break;
                        case "NOT_SET":
                        case 90:
                            message.TickType = 90;
                            break;
                        }
                        if (object.Price != null)
                            message.Price = Number(object.Price);
                        if (object.Attributes != null) {
                            if (typeof object.Attributes !== "object")
                                throw TypeError(".Jde.Markets.Proto.Results.TickPrice.Attributes: object expected");
                            message.Attributes = $root.Jde.Markets.Proto.Results.TickAttrib.fromObject(object.Attributes);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a TickPrice message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @static
                     * @param {Jde.Markets.Proto.Results.TickPrice} message TickPrice
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TickPrice.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.TickType = options.enums === String ? "BidSize" : 0;
                            object.Price = 0;
                            object.Attributes = null;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            object.TickType = options.enums === String ? $root.Jde.Markets.Proto.Results.ETickType[message.TickType] : message.TickType;
                        if (message.Price != null && message.hasOwnProperty("Price"))
                            object.Price = options.json && !isFinite(message.Price) ? String(message.Price) : message.Price;
                        if (message.Attributes != null && message.hasOwnProperty("Attributes"))
                            object.Attributes = $root.Jde.Markets.Proto.Results.TickAttrib.toObject(message.Attributes, options);
                        return object;
                    };

                    /**
                     * Converts this TickPrice to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.TickPrice
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TickPrice.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return TickPrice;
                })();

                Results.TickSize = (function() {

                    /**
                     * Properties of a TickSize.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITickSize
                     * @property {number|null} [RequestId] TickSize RequestId
                     * @property {Jde.Markets.Proto.Results.ETickType|null} [TickType] TickSize TickType
                     * @property {number|null} [Size] TickSize Size
                     */

                    /**
                     * Constructs a new TickSize.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a TickSize.
                     * @implements ITickSize
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITickSize=} [properties] Properties to set
                     */
                    function TickSize(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TickSize RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @instance
                     */
                    TickSize.prototype.RequestId = 0;

                    /**
                     * TickSize TickType.
                     * @member {Jde.Markets.Proto.Results.ETickType} TickType
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @instance
                     */
                    TickSize.prototype.TickType = 0;

                    /**
                     * TickSize Size.
                     * @member {number} Size
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @instance
                     */
                    TickSize.prototype.Size = 0;

                    /**
                     * Creates a new TickSize instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickSize=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.TickSize} TickSize instance
                     */
                    TickSize.create = function create(properties) {
                        return new TickSize(properties);
                    };

                    /**
                     * Encodes the specified TickSize message. Does not implicitly {@link Jde.Markets.Proto.Results.TickSize.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickSize} message TickSize message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickSize.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TickType);
                        if (message.Size != null && message.hasOwnProperty("Size"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Size);
                        return writer;
                    };

                    /**
                     * Encodes the specified TickSize message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickSize.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickSize} message TickSize message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickSize.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TickSize message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.TickSize} TickSize
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickSize.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.TickSize();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.TickType = reader.int32();
                                break;
                            case 3:
                                message.Size = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TickSize message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.TickSize} TickSize
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickSize.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TickSize message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TickSize.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            switch (message.TickType) {
                            default:
                                return "TickType: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 24:
                            case 25:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 32:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                            case 46:
                            case 47:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                            case 58:
                            case 59:
                            case 60:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70:
                            case 71:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 80:
                            case 81:
                            case 82:
                            case 83:
                            case 84:
                            case 85:
                            case 86:
                            case 87:
                            case 88:
                            case 89:
                            case 90:
                                break;
                            }
                        if (message.Size != null && message.hasOwnProperty("Size"))
                            if (!$util.isInteger(message.Size))
                                return "Size: integer expected";
                        return null;
                    };

                    /**
                     * Creates a TickSize message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.TickSize} TickSize
                     */
                    TickSize.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.TickSize)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.TickSize();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        switch (object.TickType) {
                        case "BidSize":
                        case 0:
                            message.TickType = 0;
                            break;
                        case "BidPrice":
                        case 1:
                            message.TickType = 1;
                            break;
                        case "AskPrice":
                        case 2:
                            message.TickType = 2;
                            break;
                        case "AskSize":
                        case 3:
                            message.TickType = 3;
                            break;
                        case "LastPrice":
                        case 4:
                            message.TickType = 4;
                            break;
                        case "LastSize":
                        case 5:
                            message.TickType = 5;
                            break;
                        case "High":
                        case 6:
                            message.TickType = 6;
                            break;
                        case "Low":
                        case 7:
                            message.TickType = 7;
                            break;
                        case "Volume":
                        case 8:
                            message.TickType = 8;
                            break;
                        case "ClosePrice":
                        case 9:
                            message.TickType = 9;
                            break;
                        case "BID_OPTION_COMPUTATION":
                        case 10:
                            message.TickType = 10;
                            break;
                        case "ASK_OPTION_COMPUTATION":
                        case 11:
                            message.TickType = 11;
                            break;
                        case "LAST_OPTION_COMPUTATION":
                        case 12:
                            message.TickType = 12;
                            break;
                        case "MODEL_OPTION":
                        case 13:
                            message.TickType = 13;
                            break;
                        case "OpenTick":
                        case 14:
                            message.TickType = 14;
                            break;
                        case "LOW_13_WEEK":
                        case 15:
                            message.TickType = 15;
                            break;
                        case "HIGH_13_WEEK":
                        case 16:
                            message.TickType = 16;
                            break;
                        case "LOW_26_WEEK":
                        case 17:
                            message.TickType = 17;
                            break;
                        case "HIGH_26_WEEK":
                        case 18:
                            message.TickType = 18;
                            break;
                        case "LOW_52_WEEK":
                        case 19:
                            message.TickType = 19;
                            break;
                        case "HIGH_52_WEEK":
                        case 20:
                            message.TickType = 20;
                            break;
                        case "AVG_VOLUME":
                        case 21:
                            message.TickType = 21;
                            break;
                        case "OPEN_INTEREST":
                        case 22:
                            message.TickType = 22;
                            break;
                        case "OPTION_HISTORICAL_VOL":
                        case 23:
                            message.TickType = 23;
                            break;
                        case "OPTION_IMPLIED_VOL":
                        case 24:
                            message.TickType = 24;
                            break;
                        case "OPTION_BID_EXCH":
                        case 25:
                            message.TickType = 25;
                            break;
                        case "OPTION_ASK_EXCH":
                        case 26:
                            message.TickType = 26;
                            break;
                        case "OPTION_CALL_OPEN_INTEREST":
                        case 27:
                            message.TickType = 27;
                            break;
                        case "OPTION_PUT_OPEN_INTEREST":
                        case 28:
                            message.TickType = 28;
                            break;
                        case "OPTION_CALL_VOLUME":
                        case 29:
                            message.TickType = 29;
                            break;
                        case "OPTION_PUT_VOLUME":
                        case 30:
                            message.TickType = 30;
                            break;
                        case "INDEX_FUTURE_PREMIUM":
                        case 31:
                            message.TickType = 31;
                            break;
                        case "BidExchange":
                        case 32:
                            message.TickType = 32;
                            break;
                        case "AskExchange":
                        case 33:
                            message.TickType = 33;
                            break;
                        case "AUCTION_VOLUME":
                        case 34:
                            message.TickType = 34;
                            break;
                        case "AUCTION_PRICE":
                        case 35:
                            message.TickType = 35;
                            break;
                        case "AUCTION_IMBALANCE":
                        case 36:
                            message.TickType = 36;
                            break;
                        case "MARK_PRICE":
                        case 37:
                            message.TickType = 37;
                            break;
                        case "BID_EFP_COMPUTATION":
                        case 38:
                            message.TickType = 38;
                            break;
                        case "ASK_EFP_COMPUTATION":
                        case 39:
                            message.TickType = 39;
                            break;
                        case "LAST_EFP_COMPUTATION":
                        case 40:
                            message.TickType = 40;
                            break;
                        case "OPEN_EFP_COMPUTATION":
                        case 41:
                            message.TickType = 41;
                            break;
                        case "HIGH_EFP_COMPUTATION":
                        case 42:
                            message.TickType = 42;
                            break;
                        case "LOW_EFP_COMPUTATION":
                        case 43:
                            message.TickType = 43;
                            break;
                        case "CLOSE_EFP_COMPUTATION":
                        case 44:
                            message.TickType = 44;
                            break;
                        case "LastTimestamp":
                        case 45:
                            message.TickType = 45;
                            break;
                        case "SHORTABLE":
                        case 46:
                            message.TickType = 46;
                            break;
                        case "FUNDAMENTAL_RATIOS":
                        case 47:
                            message.TickType = 47;
                            break;
                        case "RT_VOLUME":
                        case 48:
                            message.TickType = 48;
                            break;
                        case "Halted":
                        case 49:
                            message.TickType = 49;
                            break;
                        case "BID_YIELD":
                        case 50:
                            message.TickType = 50;
                            break;
                        case "ASK_YIELD":
                        case 51:
                            message.TickType = 51;
                            break;
                        case "LAST_YIELD":
                        case 52:
                            message.TickType = 52;
                            break;
                        case "CUST_OPTION_COMPUTATION":
                        case 53:
                            message.TickType = 53;
                            break;
                        case "TRADE_COUNT":
                        case 54:
                            message.TickType = 54;
                            break;
                        case "TRADE_RATE":
                        case 55:
                            message.TickType = 55;
                            break;
                        case "VOLUME_RATE":
                        case 56:
                            message.TickType = 56;
                            break;
                        case "LAST_RTH_TRADE":
                        case 57:
                            message.TickType = 57;
                            break;
                        case "RT_HISTORICAL_VOL":
                        case 58:
                            message.TickType = 58;
                            break;
                        case "IB_DIVIDENDS":
                        case 59:
                            message.TickType = 59;
                            break;
                        case "BOND_FACTOR_MULTIPLIER":
                        case 60:
                            message.TickType = 60;
                            break;
                        case "REGULATORY_IMBALANCE":
                        case 61:
                            message.TickType = 61;
                            break;
                        case "NEWS_TICK":
                        case 62:
                            message.TickType = 62;
                            break;
                        case "SHORT_TERM_VOLUME_3_MIN":
                        case 63:
                            message.TickType = 63;
                            break;
                        case "SHORT_TERM_VOLUME_5_MIN":
                        case 64:
                            message.TickType = 64;
                            break;
                        case "SHORT_TERM_VOLUME_10_MIN":
                        case 65:
                            message.TickType = 65;
                            break;
                        case "DELAYED_BID":
                        case 66:
                            message.TickType = 66;
                            break;
                        case "DELAYED_ASK":
                        case 67:
                            message.TickType = 67;
                            break;
                        case "DELAYED_LAST":
                        case 68:
                            message.TickType = 68;
                            break;
                        case "DELAYED_BID_SIZE":
                        case 69:
                            message.TickType = 69;
                            break;
                        case "DELAYED_ASK_SIZE":
                        case 70:
                            message.TickType = 70;
                            break;
                        case "DELAYED_LAST_SIZE":
                        case 71:
                            message.TickType = 71;
                            break;
                        case "DELAYED_HIGH":
                        case 72:
                            message.TickType = 72;
                            break;
                        case "DELAYED_LOW":
                        case 73:
                            message.TickType = 73;
                            break;
                        case "DELAYED_VOLUME":
                        case 74:
                            message.TickType = 74;
                            break;
                        case "DELAYED_CLOSE":
                        case 75:
                            message.TickType = 75;
                            break;
                        case "DELAYED_OPEN":
                        case 76:
                            message.TickType = 76;
                            break;
                        case "RT_TRD_VOLUME":
                        case 77:
                            message.TickType = 77;
                            break;
                        case "CREDITMAN_MARK_PRICE":
                        case 78:
                            message.TickType = 78;
                            break;
                        case "CREDITMAN_SLOW_MARK_PRICE":
                        case 79:
                            message.TickType = 79;
                            break;
                        case "DELAYED_BID_OPTION_COMPUTATION":
                        case 80:
                            message.TickType = 80;
                            break;
                        case "DELAYED_ASK_OPTION_COMPUTATION":
                        case 81:
                            message.TickType = 81;
                            break;
                        case "DELAYED_LAST_OPTION_COMPUTATION":
                        case 82:
                            message.TickType = 82;
                            break;
                        case "DELAYED_MODEL_OPTION_COMPUTATION":
                        case 83:
                            message.TickType = 83;
                            break;
                        case "LastExchange":
                        case 84:
                            message.TickType = 84;
                            break;
                        case "LAST_REG_TIME":
                        case 85:
                            message.TickType = 85;
                            break;
                        case "FUTURES_OPEN_INTEREST":
                        case 86:
                            message.TickType = 86;
                            break;
                        case "AVG_OPT_VOLUME":
                        case 87:
                            message.TickType = 87;
                            break;
                        case "DELAYED_LAST_TIMESTAMP":
                        case 88:
                            message.TickType = 88;
                            break;
                        case "SHORTABLE_SHARES":
                        case 89:
                            message.TickType = 89;
                            break;
                        case "NOT_SET":
                        case 90:
                            message.TickType = 90;
                            break;
                        }
                        if (object.Size != null)
                            message.Size = object.Size | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a TickSize message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @static
                     * @param {Jde.Markets.Proto.Results.TickSize} message TickSize
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TickSize.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.TickType = options.enums === String ? "BidSize" : 0;
                            object.Size = 0;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            object.TickType = options.enums === String ? $root.Jde.Markets.Proto.Results.ETickType[message.TickType] : message.TickType;
                        if (message.Size != null && message.hasOwnProperty("Size"))
                            object.Size = message.Size;
                        return object;
                    };

                    /**
                     * Converts this TickSize to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.TickSize
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TickSize.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return TickSize;
                })();

                Results.TickString = (function() {

                    /**
                     * Properties of a TickString.
                     * @memberof Jde.Markets.Proto.Results
                     * @interface ITickString
                     * @property {number|null} [RequestId] TickString RequestId
                     * @property {Jde.Markets.Proto.Results.ETickType|null} [TickType] TickString TickType
                     * @property {string|null} [Value] TickString Value
                     */

                    /**
                     * Constructs a new TickString.
                     * @memberof Jde.Markets.Proto.Results
                     * @classdesc Represents a TickString.
                     * @implements ITickString
                     * @constructor
                     * @param {Jde.Markets.Proto.Results.ITickString=} [properties] Properties to set
                     */
                    function TickString(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TickString RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @instance
                     */
                    TickString.prototype.RequestId = 0;

                    /**
                     * TickString TickType.
                     * @member {Jde.Markets.Proto.Results.ETickType} TickType
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @instance
                     */
                    TickString.prototype.TickType = 0;

                    /**
                     * TickString Value.
                     * @member {string} Value
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @instance
                     */
                    TickString.prototype.Value = "";

                    /**
                     * Creates a new TickString instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickString=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Results.TickString} TickString instance
                     */
                    TickString.create = function create(properties) {
                        return new TickString(properties);
                    };

                    /**
                     * Encodes the specified TickString message. Does not implicitly {@link Jde.Markets.Proto.Results.TickString.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickString} message TickString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickString.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TickType);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.Value);
                        return writer;
                    };

                    /**
                     * Encodes the specified TickString message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickString.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {Jde.Markets.Proto.Results.ITickString} message TickString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TickString.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TickString message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Results.TickString} TickString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickString.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Results.TickString();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.TickType = reader.int32();
                                break;
                            case 3:
                                message.Value = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TickString message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Results.TickString} TickString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TickString.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TickString message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TickString.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            switch (message.TickType) {
                            default:
                                return "TickType: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 24:
                            case 25:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 32:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                            case 46:
                            case 47:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                            case 58:
                            case 59:
                            case 60:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70:
                            case 71:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 80:
                            case 81:
                            case 82:
                            case 83:
                            case 84:
                            case 85:
                            case 86:
                            case 87:
                            case 88:
                            case 89:
                            case 90:
                                break;
                            }
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isString(message.Value))
                                return "Value: string expected";
                        return null;
                    };

                    /**
                     * Creates a TickString message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Results.TickString} TickString
                     */
                    TickString.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Results.TickString)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Results.TickString();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        switch (object.TickType) {
                        case "BidSize":
                        case 0:
                            message.TickType = 0;
                            break;
                        case "BidPrice":
                        case 1:
                            message.TickType = 1;
                            break;
                        case "AskPrice":
                        case 2:
                            message.TickType = 2;
                            break;
                        case "AskSize":
                        case 3:
                            message.TickType = 3;
                            break;
                        case "LastPrice":
                        case 4:
                            message.TickType = 4;
                            break;
                        case "LastSize":
                        case 5:
                            message.TickType = 5;
                            break;
                        case "High":
                        case 6:
                            message.TickType = 6;
                            break;
                        case "Low":
                        case 7:
                            message.TickType = 7;
                            break;
                        case "Volume":
                        case 8:
                            message.TickType = 8;
                            break;
                        case "ClosePrice":
                        case 9:
                            message.TickType = 9;
                            break;
                        case "BID_OPTION_COMPUTATION":
                        case 10:
                            message.TickType = 10;
                            break;
                        case "ASK_OPTION_COMPUTATION":
                        case 11:
                            message.TickType = 11;
                            break;
                        case "LAST_OPTION_COMPUTATION":
                        case 12:
                            message.TickType = 12;
                            break;
                        case "MODEL_OPTION":
                        case 13:
                            message.TickType = 13;
                            break;
                        case "OpenTick":
                        case 14:
                            message.TickType = 14;
                            break;
                        case "LOW_13_WEEK":
                        case 15:
                            message.TickType = 15;
                            break;
                        case "HIGH_13_WEEK":
                        case 16:
                            message.TickType = 16;
                            break;
                        case "LOW_26_WEEK":
                        case 17:
                            message.TickType = 17;
                            break;
                        case "HIGH_26_WEEK":
                        case 18:
                            message.TickType = 18;
                            break;
                        case "LOW_52_WEEK":
                        case 19:
                            message.TickType = 19;
                            break;
                        case "HIGH_52_WEEK":
                        case 20:
                            message.TickType = 20;
                            break;
                        case "AVG_VOLUME":
                        case 21:
                            message.TickType = 21;
                            break;
                        case "OPEN_INTEREST":
                        case 22:
                            message.TickType = 22;
                            break;
                        case "OPTION_HISTORICAL_VOL":
                        case 23:
                            message.TickType = 23;
                            break;
                        case "OPTION_IMPLIED_VOL":
                        case 24:
                            message.TickType = 24;
                            break;
                        case "OPTION_BID_EXCH":
                        case 25:
                            message.TickType = 25;
                            break;
                        case "OPTION_ASK_EXCH":
                        case 26:
                            message.TickType = 26;
                            break;
                        case "OPTION_CALL_OPEN_INTEREST":
                        case 27:
                            message.TickType = 27;
                            break;
                        case "OPTION_PUT_OPEN_INTEREST":
                        case 28:
                            message.TickType = 28;
                            break;
                        case "OPTION_CALL_VOLUME":
                        case 29:
                            message.TickType = 29;
                            break;
                        case "OPTION_PUT_VOLUME":
                        case 30:
                            message.TickType = 30;
                            break;
                        case "INDEX_FUTURE_PREMIUM":
                        case 31:
                            message.TickType = 31;
                            break;
                        case "BidExchange":
                        case 32:
                            message.TickType = 32;
                            break;
                        case "AskExchange":
                        case 33:
                            message.TickType = 33;
                            break;
                        case "AUCTION_VOLUME":
                        case 34:
                            message.TickType = 34;
                            break;
                        case "AUCTION_PRICE":
                        case 35:
                            message.TickType = 35;
                            break;
                        case "AUCTION_IMBALANCE":
                        case 36:
                            message.TickType = 36;
                            break;
                        case "MARK_PRICE":
                        case 37:
                            message.TickType = 37;
                            break;
                        case "BID_EFP_COMPUTATION":
                        case 38:
                            message.TickType = 38;
                            break;
                        case "ASK_EFP_COMPUTATION":
                        case 39:
                            message.TickType = 39;
                            break;
                        case "LAST_EFP_COMPUTATION":
                        case 40:
                            message.TickType = 40;
                            break;
                        case "OPEN_EFP_COMPUTATION":
                        case 41:
                            message.TickType = 41;
                            break;
                        case "HIGH_EFP_COMPUTATION":
                        case 42:
                            message.TickType = 42;
                            break;
                        case "LOW_EFP_COMPUTATION":
                        case 43:
                            message.TickType = 43;
                            break;
                        case "CLOSE_EFP_COMPUTATION":
                        case 44:
                            message.TickType = 44;
                            break;
                        case "LastTimestamp":
                        case 45:
                            message.TickType = 45;
                            break;
                        case "SHORTABLE":
                        case 46:
                            message.TickType = 46;
                            break;
                        case "FUNDAMENTAL_RATIOS":
                        case 47:
                            message.TickType = 47;
                            break;
                        case "RT_VOLUME":
                        case 48:
                            message.TickType = 48;
                            break;
                        case "Halted":
                        case 49:
                            message.TickType = 49;
                            break;
                        case "BID_YIELD":
                        case 50:
                            message.TickType = 50;
                            break;
                        case "ASK_YIELD":
                        case 51:
                            message.TickType = 51;
                            break;
                        case "LAST_YIELD":
                        case 52:
                            message.TickType = 52;
                            break;
                        case "CUST_OPTION_COMPUTATION":
                        case 53:
                            message.TickType = 53;
                            break;
                        case "TRADE_COUNT":
                        case 54:
                            message.TickType = 54;
                            break;
                        case "TRADE_RATE":
                        case 55:
                            message.TickType = 55;
                            break;
                        case "VOLUME_RATE":
                        case 56:
                            message.TickType = 56;
                            break;
                        case "LAST_RTH_TRADE":
                        case 57:
                            message.TickType = 57;
                            break;
                        case "RT_HISTORICAL_VOL":
                        case 58:
                            message.TickType = 58;
                            break;
                        case "IB_DIVIDENDS":
                        case 59:
                            message.TickType = 59;
                            break;
                        case "BOND_FACTOR_MULTIPLIER":
                        case 60:
                            message.TickType = 60;
                            break;
                        case "REGULATORY_IMBALANCE":
                        case 61:
                            message.TickType = 61;
                            break;
                        case "NEWS_TICK":
                        case 62:
                            message.TickType = 62;
                            break;
                        case "SHORT_TERM_VOLUME_3_MIN":
                        case 63:
                            message.TickType = 63;
                            break;
                        case "SHORT_TERM_VOLUME_5_MIN":
                        case 64:
                            message.TickType = 64;
                            break;
                        case "SHORT_TERM_VOLUME_10_MIN":
                        case 65:
                            message.TickType = 65;
                            break;
                        case "DELAYED_BID":
                        case 66:
                            message.TickType = 66;
                            break;
                        case "DELAYED_ASK":
                        case 67:
                            message.TickType = 67;
                            break;
                        case "DELAYED_LAST":
                        case 68:
                            message.TickType = 68;
                            break;
                        case "DELAYED_BID_SIZE":
                        case 69:
                            message.TickType = 69;
                            break;
                        case "DELAYED_ASK_SIZE":
                        case 70:
                            message.TickType = 70;
                            break;
                        case "DELAYED_LAST_SIZE":
                        case 71:
                            message.TickType = 71;
                            break;
                        case "DELAYED_HIGH":
                        case 72:
                            message.TickType = 72;
                            break;
                        case "DELAYED_LOW":
                        case 73:
                            message.TickType = 73;
                            break;
                        case "DELAYED_VOLUME":
                        case 74:
                            message.TickType = 74;
                            break;
                        case "DELAYED_CLOSE":
                        case 75:
                            message.TickType = 75;
                            break;
                        case "DELAYED_OPEN":
                        case 76:
                            message.TickType = 76;
                            break;
                        case "RT_TRD_VOLUME":
                        case 77:
                            message.TickType = 77;
                            break;
                        case "CREDITMAN_MARK_PRICE":
                        case 78:
                            message.TickType = 78;
                            break;
                        case "CREDITMAN_SLOW_MARK_PRICE":
                        case 79:
                            message.TickType = 79;
                            break;
                        case "DELAYED_BID_OPTION_COMPUTATION":
                        case 80:
                            message.TickType = 80;
                            break;
                        case "DELAYED_ASK_OPTION_COMPUTATION":
                        case 81:
                            message.TickType = 81;
                            break;
                        case "DELAYED_LAST_OPTION_COMPUTATION":
                        case 82:
                            message.TickType = 82;
                            break;
                        case "DELAYED_MODEL_OPTION_COMPUTATION":
                        case 83:
                            message.TickType = 83;
                            break;
                        case "LastExchange":
                        case 84:
                            message.TickType = 84;
                            break;
                        case "LAST_REG_TIME":
                        case 85:
                            message.TickType = 85;
                            break;
                        case "FUTURES_OPEN_INTEREST":
                        case 86:
                            message.TickType = 86;
                            break;
                        case "AVG_OPT_VOLUME":
                        case 87:
                            message.TickType = 87;
                            break;
                        case "DELAYED_LAST_TIMESTAMP":
                        case 88:
                            message.TickType = 88;
                            break;
                        case "SHORTABLE_SHARES":
                        case 89:
                            message.TickType = 89;
                            break;
                        case "NOT_SET":
                        case 90:
                            message.TickType = 90;
                            break;
                        }
                        if (object.Value != null)
                            message.Value = String(object.Value);
                        return message;
                    };

                    /**
                     * Creates a plain object from a TickString message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @static
                     * @param {Jde.Markets.Proto.Results.TickString} message TickString
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TickString.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.TickType = options.enums === String ? "BidSize" : 0;
                            object.Value = "";
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.TickType != null && message.hasOwnProperty("TickType"))
                            object.TickType = options.enums === String ? $root.Jde.Markets.Proto.Results.ETickType[message.TickType] : message.TickType;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        return object;
                    };

                    /**
                     * Converts this TickString to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Results.TickString
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TickString.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return TickString;
                })();

                /**
                 * ETickType enum.
                 * @name Jde.Markets.Proto.Results.ETickType
                 * @enum {string}
                 * @property {number} BidSize=0 BidSize value
                 * @property {number} BidPrice=1 BidPrice value
                 * @property {number} AskPrice=2 AskPrice value
                 * @property {number} AskSize=3 AskSize value
                 * @property {number} LastPrice=4 LastPrice value
                 * @property {number} LastSize=5 LastSize value
                 * @property {number} High=6 High value
                 * @property {number} Low=7 Low value
                 * @property {number} Volume=8 Volume value
                 * @property {number} ClosePrice=9 ClosePrice value
                 * @property {number} BID_OPTION_COMPUTATION=10 BID_OPTION_COMPUTATION value
                 * @property {number} ASK_OPTION_COMPUTATION=11 ASK_OPTION_COMPUTATION value
                 * @property {number} LAST_OPTION_COMPUTATION=12 LAST_OPTION_COMPUTATION value
                 * @property {number} MODEL_OPTION=13 MODEL_OPTION value
                 * @property {number} OpenTick=14 OpenTick value
                 * @property {number} LOW_13_WEEK=15 LOW_13_WEEK value
                 * @property {number} HIGH_13_WEEK=16 HIGH_13_WEEK value
                 * @property {number} LOW_26_WEEK=17 LOW_26_WEEK value
                 * @property {number} HIGH_26_WEEK=18 HIGH_26_WEEK value
                 * @property {number} LOW_52_WEEK=19 LOW_52_WEEK value
                 * @property {number} HIGH_52_WEEK=20 HIGH_52_WEEK value
                 * @property {number} AVG_VOLUME=21 AVG_VOLUME value
                 * @property {number} OPEN_INTEREST=22 OPEN_INTEREST value
                 * @property {number} OPTION_HISTORICAL_VOL=23 OPTION_HISTORICAL_VOL value
                 * @property {number} OPTION_IMPLIED_VOL=24 OPTION_IMPLIED_VOL value
                 * @property {number} OPTION_BID_EXCH=25 OPTION_BID_EXCH value
                 * @property {number} OPTION_ASK_EXCH=26 OPTION_ASK_EXCH value
                 * @property {number} OPTION_CALL_OPEN_INTEREST=27 OPTION_CALL_OPEN_INTEREST value
                 * @property {number} OPTION_PUT_OPEN_INTEREST=28 OPTION_PUT_OPEN_INTEREST value
                 * @property {number} OPTION_CALL_VOLUME=29 OPTION_CALL_VOLUME value
                 * @property {number} OPTION_PUT_VOLUME=30 OPTION_PUT_VOLUME value
                 * @property {number} INDEX_FUTURE_PREMIUM=31 INDEX_FUTURE_PREMIUM value
                 * @property {number} BidExchange=32 BidExchange value
                 * @property {number} AskExchange=33 AskExchange value
                 * @property {number} AUCTION_VOLUME=34 AUCTION_VOLUME value
                 * @property {number} AUCTION_PRICE=35 AUCTION_PRICE value
                 * @property {number} AUCTION_IMBALANCE=36 AUCTION_IMBALANCE value
                 * @property {number} MARK_PRICE=37 MARK_PRICE value
                 * @property {number} BID_EFP_COMPUTATION=38 BID_EFP_COMPUTATION value
                 * @property {number} ASK_EFP_COMPUTATION=39 ASK_EFP_COMPUTATION value
                 * @property {number} LAST_EFP_COMPUTATION=40 LAST_EFP_COMPUTATION value
                 * @property {number} OPEN_EFP_COMPUTATION=41 OPEN_EFP_COMPUTATION value
                 * @property {number} HIGH_EFP_COMPUTATION=42 HIGH_EFP_COMPUTATION value
                 * @property {number} LOW_EFP_COMPUTATION=43 LOW_EFP_COMPUTATION value
                 * @property {number} CLOSE_EFP_COMPUTATION=44 CLOSE_EFP_COMPUTATION value
                 * @property {number} LastTimestamp=45 LastTimestamp value
                 * @property {number} SHORTABLE=46 SHORTABLE value
                 * @property {number} FUNDAMENTAL_RATIOS=47 FUNDAMENTAL_RATIOS value
                 * @property {number} RT_VOLUME=48 RT_VOLUME value
                 * @property {number} Halted=49 Halted value
                 * @property {number} BID_YIELD=50 BID_YIELD value
                 * @property {number} ASK_YIELD=51 ASK_YIELD value
                 * @property {number} LAST_YIELD=52 LAST_YIELD value
                 * @property {number} CUST_OPTION_COMPUTATION=53 CUST_OPTION_COMPUTATION value
                 * @property {number} TRADE_COUNT=54 TRADE_COUNT value
                 * @property {number} TRADE_RATE=55 TRADE_RATE value
                 * @property {number} VOLUME_RATE=56 VOLUME_RATE value
                 * @property {number} LAST_RTH_TRADE=57 LAST_RTH_TRADE value
                 * @property {number} RT_HISTORICAL_VOL=58 RT_HISTORICAL_VOL value
                 * @property {number} IB_DIVIDENDS=59 IB_DIVIDENDS value
                 * @property {number} BOND_FACTOR_MULTIPLIER=60 BOND_FACTOR_MULTIPLIER value
                 * @property {number} REGULATORY_IMBALANCE=61 REGULATORY_IMBALANCE value
                 * @property {number} NEWS_TICK=62 NEWS_TICK value
                 * @property {number} SHORT_TERM_VOLUME_3_MIN=63 SHORT_TERM_VOLUME_3_MIN value
                 * @property {number} SHORT_TERM_VOLUME_5_MIN=64 SHORT_TERM_VOLUME_5_MIN value
                 * @property {number} SHORT_TERM_VOLUME_10_MIN=65 SHORT_TERM_VOLUME_10_MIN value
                 * @property {number} DELAYED_BID=66 DELAYED_BID value
                 * @property {number} DELAYED_ASK=67 DELAYED_ASK value
                 * @property {number} DELAYED_LAST=68 DELAYED_LAST value
                 * @property {number} DELAYED_BID_SIZE=69 DELAYED_BID_SIZE value
                 * @property {number} DELAYED_ASK_SIZE=70 DELAYED_ASK_SIZE value
                 * @property {number} DELAYED_LAST_SIZE=71 DELAYED_LAST_SIZE value
                 * @property {number} DELAYED_HIGH=72 DELAYED_HIGH value
                 * @property {number} DELAYED_LOW=73 DELAYED_LOW value
                 * @property {number} DELAYED_VOLUME=74 DELAYED_VOLUME value
                 * @property {number} DELAYED_CLOSE=75 DELAYED_CLOSE value
                 * @property {number} DELAYED_OPEN=76 DELAYED_OPEN value
                 * @property {number} RT_TRD_VOLUME=77 RT_TRD_VOLUME value
                 * @property {number} CREDITMAN_MARK_PRICE=78 CREDITMAN_MARK_PRICE value
                 * @property {number} CREDITMAN_SLOW_MARK_PRICE=79 CREDITMAN_SLOW_MARK_PRICE value
                 * @property {number} DELAYED_BID_OPTION_COMPUTATION=80 DELAYED_BID_OPTION_COMPUTATION value
                 * @property {number} DELAYED_ASK_OPTION_COMPUTATION=81 DELAYED_ASK_OPTION_COMPUTATION value
                 * @property {number} DELAYED_LAST_OPTION_COMPUTATION=82 DELAYED_LAST_OPTION_COMPUTATION value
                 * @property {number} DELAYED_MODEL_OPTION_COMPUTATION=83 DELAYED_MODEL_OPTION_COMPUTATION value
                 * @property {number} LastExchange=84 LastExchange value
                 * @property {number} LAST_REG_TIME=85 LAST_REG_TIME value
                 * @property {number} FUTURES_OPEN_INTEREST=86 FUTURES_OPEN_INTEREST value
                 * @property {number} AVG_OPT_VOLUME=87 AVG_OPT_VOLUME value
                 * @property {number} DELAYED_LAST_TIMESTAMP=88 DELAYED_LAST_TIMESTAMP value
                 * @property {number} SHORTABLE_SHARES=89 SHORTABLE_SHARES value
                 * @property {number} NOT_SET=90 NOT_SET value
                 */
                Results.ETickType = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "BidSize"] = 0;
                    values[valuesById[1] = "BidPrice"] = 1;
                    values[valuesById[2] = "AskPrice"] = 2;
                    values[valuesById[3] = "AskSize"] = 3;
                    values[valuesById[4] = "LastPrice"] = 4;
                    values[valuesById[5] = "LastSize"] = 5;
                    values[valuesById[6] = "High"] = 6;
                    values[valuesById[7] = "Low"] = 7;
                    values[valuesById[8] = "Volume"] = 8;
                    values[valuesById[9] = "ClosePrice"] = 9;
                    values[valuesById[10] = "BID_OPTION_COMPUTATION"] = 10;
                    values[valuesById[11] = "ASK_OPTION_COMPUTATION"] = 11;
                    values[valuesById[12] = "LAST_OPTION_COMPUTATION"] = 12;
                    values[valuesById[13] = "MODEL_OPTION"] = 13;
                    values[valuesById[14] = "OpenTick"] = 14;
                    values[valuesById[15] = "LOW_13_WEEK"] = 15;
                    values[valuesById[16] = "HIGH_13_WEEK"] = 16;
                    values[valuesById[17] = "LOW_26_WEEK"] = 17;
                    values[valuesById[18] = "HIGH_26_WEEK"] = 18;
                    values[valuesById[19] = "LOW_52_WEEK"] = 19;
                    values[valuesById[20] = "HIGH_52_WEEK"] = 20;
                    values[valuesById[21] = "AVG_VOLUME"] = 21;
                    values[valuesById[22] = "OPEN_INTEREST"] = 22;
                    values[valuesById[23] = "OPTION_HISTORICAL_VOL"] = 23;
                    values[valuesById[24] = "OPTION_IMPLIED_VOL"] = 24;
                    values[valuesById[25] = "OPTION_BID_EXCH"] = 25;
                    values[valuesById[26] = "OPTION_ASK_EXCH"] = 26;
                    values[valuesById[27] = "OPTION_CALL_OPEN_INTEREST"] = 27;
                    values[valuesById[28] = "OPTION_PUT_OPEN_INTEREST"] = 28;
                    values[valuesById[29] = "OPTION_CALL_VOLUME"] = 29;
                    values[valuesById[30] = "OPTION_PUT_VOLUME"] = 30;
                    values[valuesById[31] = "INDEX_FUTURE_PREMIUM"] = 31;
                    values[valuesById[32] = "BidExchange"] = 32;
                    values[valuesById[33] = "AskExchange"] = 33;
                    values[valuesById[34] = "AUCTION_VOLUME"] = 34;
                    values[valuesById[35] = "AUCTION_PRICE"] = 35;
                    values[valuesById[36] = "AUCTION_IMBALANCE"] = 36;
                    values[valuesById[37] = "MARK_PRICE"] = 37;
                    values[valuesById[38] = "BID_EFP_COMPUTATION"] = 38;
                    values[valuesById[39] = "ASK_EFP_COMPUTATION"] = 39;
                    values[valuesById[40] = "LAST_EFP_COMPUTATION"] = 40;
                    values[valuesById[41] = "OPEN_EFP_COMPUTATION"] = 41;
                    values[valuesById[42] = "HIGH_EFP_COMPUTATION"] = 42;
                    values[valuesById[43] = "LOW_EFP_COMPUTATION"] = 43;
                    values[valuesById[44] = "CLOSE_EFP_COMPUTATION"] = 44;
                    values[valuesById[45] = "LastTimestamp"] = 45;
                    values[valuesById[46] = "SHORTABLE"] = 46;
                    values[valuesById[47] = "FUNDAMENTAL_RATIOS"] = 47;
                    values[valuesById[48] = "RT_VOLUME"] = 48;
                    values[valuesById[49] = "Halted"] = 49;
                    values[valuesById[50] = "BID_YIELD"] = 50;
                    values[valuesById[51] = "ASK_YIELD"] = 51;
                    values[valuesById[52] = "LAST_YIELD"] = 52;
                    values[valuesById[53] = "CUST_OPTION_COMPUTATION"] = 53;
                    values[valuesById[54] = "TRADE_COUNT"] = 54;
                    values[valuesById[55] = "TRADE_RATE"] = 55;
                    values[valuesById[56] = "VOLUME_RATE"] = 56;
                    values[valuesById[57] = "LAST_RTH_TRADE"] = 57;
                    values[valuesById[58] = "RT_HISTORICAL_VOL"] = 58;
                    values[valuesById[59] = "IB_DIVIDENDS"] = 59;
                    values[valuesById[60] = "BOND_FACTOR_MULTIPLIER"] = 60;
                    values[valuesById[61] = "REGULATORY_IMBALANCE"] = 61;
                    values[valuesById[62] = "NEWS_TICK"] = 62;
                    values[valuesById[63] = "SHORT_TERM_VOLUME_3_MIN"] = 63;
                    values[valuesById[64] = "SHORT_TERM_VOLUME_5_MIN"] = 64;
                    values[valuesById[65] = "SHORT_TERM_VOLUME_10_MIN"] = 65;
                    values[valuesById[66] = "DELAYED_BID"] = 66;
                    values[valuesById[67] = "DELAYED_ASK"] = 67;
                    values[valuesById[68] = "DELAYED_LAST"] = 68;
                    values[valuesById[69] = "DELAYED_BID_SIZE"] = 69;
                    values[valuesById[70] = "DELAYED_ASK_SIZE"] = 70;
                    values[valuesById[71] = "DELAYED_LAST_SIZE"] = 71;
                    values[valuesById[72] = "DELAYED_HIGH"] = 72;
                    values[valuesById[73] = "DELAYED_LOW"] = 73;
                    values[valuesById[74] = "DELAYED_VOLUME"] = 74;
                    values[valuesById[75] = "DELAYED_CLOSE"] = 75;
                    values[valuesById[76] = "DELAYED_OPEN"] = 76;
                    values[valuesById[77] = "RT_TRD_VOLUME"] = 77;
                    values[valuesById[78] = "CREDITMAN_MARK_PRICE"] = 78;
                    values[valuesById[79] = "CREDITMAN_SLOW_MARK_PRICE"] = 79;
                    values[valuesById[80] = "DELAYED_BID_OPTION_COMPUTATION"] = 80;
                    values[valuesById[81] = "DELAYED_ASK_OPTION_COMPUTATION"] = 81;
                    values[valuesById[82] = "DELAYED_LAST_OPTION_COMPUTATION"] = 82;
                    values[valuesById[83] = "DELAYED_MODEL_OPTION_COMPUTATION"] = 83;
                    values[valuesById[84] = "LastExchange"] = 84;
                    values[valuesById[85] = "LAST_REG_TIME"] = 85;
                    values[valuesById[86] = "FUTURES_OPEN_INTEREST"] = 86;
                    values[valuesById[87] = "AVG_OPT_VOLUME"] = 87;
                    values[valuesById[88] = "DELAYED_LAST_TIMESTAMP"] = 88;
                    values[valuesById[89] = "SHORTABLE_SHARES"] = 89;
                    values[valuesById[90] = "NOT_SET"] = 90;
                    return values;
                })();

                /**
                 * EResults enum.
                 * @name Jde.Markets.Proto.Results.EResults
                 * @enum {string}
                 * @property {number} Accept=0 Accept value
                 * @property {number} MultiEnd=-1 MultiEnd value
                 * @property {number} TickPriceMessage=1 TickPriceMessage value
                 * @property {number} TickSizeMessage=2 TickSizeMessage value
                 * @property {number} OrderStatus=3 OrderStatus value
                 * @property {number} ErrorMessage=4 ErrorMessage value
                 * @property {number} OpenOrder=5 OpenOrder value
                 * @property {number} ACCT_VALUE=6 ACCT_VALUE value
                 * @property {number} PORTFOLIO_VALUE=7 PORTFOLIO_VALUE value
                 * @property {number} ACCT_UPDATE_TIME=8 ACCT_UPDATE_TIME value
                 * @property {number} NextValidId=9 NextValidId value
                 * @property {number} CONTRACT_DATA=10 CONTRACT_DATA value
                 * @property {number} ExecutionData=11 ExecutionData value
                 * @property {number} MARKET_DEPTH=12 MARKET_DEPTH value
                 * @property {number} MARKET_DEPTH_L2=13 MARKET_DEPTH_L2 value
                 * @property {number} NEWS_BULLETINS=14 NEWS_BULLETINS value
                 * @property {number} ManagedAccounts=15 ManagedAccounts value
                 * @property {number} RECEIVE_FA=16 RECEIVE_FA value
                 * @property {number} HistoricalData_=17 HistoricalData_ value
                 * @property {number} BOND_CONTRACT_DATA=18 BOND_CONTRACT_DATA value
                 * @property {number} SCANNER_PARAMETERS=19 SCANNER_PARAMETERS value
                 * @property {number} SCANNER_DATA=20 SCANNER_DATA value
                 * @property {number} TICK_OPTION_COMPUTATION=21 TICK_OPTION_COMPUTATION value
                 * @property {number} TickGenericMessage=45 TickGenericMessage value
                 * @property {number} TickStringMessage=46 TickStringMessage value
                 * @property {number} TICK_EFP=47 TICK_EFP value
                 * @property {number} CurrentTime=49 CurrentTime value
                 * @property {number} RealTimeBars=50 RealTimeBars value
                 * @property {number} FUNDAMENTAL_DATA=51 FUNDAMENTAL_DATA value
                 * @property {number} ContractDataEnd=52 ContractDataEnd value
                 * @property {number} OPEN_ORDER_END=53 OPEN_ORDER_END value
                 * @property {number} ACCT_DOWNLOAD_END=54 ACCT_DOWNLOAD_END value
                 * @property {number} EXECUTION_DATA_END=55 EXECUTION_DATA_END value
                 * @property {number} DELTA_NEUTRAL_VALIDATION=56 DELTA_NEUTRAL_VALIDATION value
                 * @property {number} TickSnapshotEnd=57 TickSnapshotEnd value
                 * @property {number} MarketDataType=58 MarketDataType value
                 * @property {number} COMMISSION_REPORT=59 COMMISSION_REPORT value
                 * @property {number} PositionData=61 PositionData value
                 * @property {number} PositionEnd=62 PositionEnd value
                 * @property {number} ACCOUNT_SUMMARY=63 ACCOUNT_SUMMARY value
                 * @property {number} ACCOUNT_SUMMARY_END=64 ACCOUNT_SUMMARY_END value
                 * @property {number} VERIFY_MESSAGE_API=65 VERIFY_MESSAGE_API value
                 * @property {number} VERIFY_COMPLETED=66 VERIFY_COMPLETED value
                 * @property {number} DISPLAY_GROUP_LIST=67 DISPLAY_GROUP_LIST value
                 * @property {number} DISPLAY_GROUP_UPDATED=68 DISPLAY_GROUP_UPDATED value
                 * @property {number} VERIFY_AND_AUTH_MESSAGE_API=69 VERIFY_AND_AUTH_MESSAGE_API value
                 * @property {number} VERIFY_AND_AUTH_COMPLETED=70 VERIFY_AND_AUTH_COMPLETED value
                 * @property {number} PositionMulti=71 PositionMulti value
                 * @property {number} PositionMultiEnd=72 PositionMultiEnd value
                 * @property {number} AccountUpdateMulti_=73 AccountUpdateMulti_ value
                 * @property {number} ACCOUNT_UPDATE_MULTI_END=74 ACCOUNT_UPDATE_MULTI_END value
                 * @property {number} SECURITY_DEFINITION_OPTION_PARAMETER=75 SECURITY_DEFINITION_OPTION_PARAMETER value
                 * @property {number} SECURITY_DEFINITION_OPTION_PARAMETER_END=76 SECURITY_DEFINITION_OPTION_PARAMETER_END value
                 * @property {number} SOFT_DOLLAR_TIERS=77 SOFT_DOLLAR_TIERS value
                 * @property {number} FAMILY_CODES=78 FAMILY_CODES value
                 * @property {number} SYMBOL_SAMPLES=79 SYMBOL_SAMPLES value
                 * @property {number} MKT_DEPTH_EXCHANGES=80 MKT_DEPTH_EXCHANGES value
                 * @property {number} TickRequiredParams=81 TickRequiredParams value
                 * @property {number} SMART_COMPONENTS=82 SMART_COMPONENTS value
                 * @property {number} NEWS_ARTICLE=83 NEWS_ARTICLE value
                 * @property {number} TICK_NEWS=84 TICK_NEWS value
                 * @property {number} NEWS_PROVIDERS=85 NEWS_PROVIDERS value
                 * @property {number} HISTORICAL_NEWS=86 HISTORICAL_NEWS value
                 * @property {number} HISTORICAL_NEWS_END=87 HISTORICAL_NEWS_END value
                 * @property {number} HEAD_TIMESTAMP=88 HEAD_TIMESTAMP value
                 * @property {number} HISTOGRAM_DATA=89 HISTOGRAM_DATA value
                 * @property {number} HISTORICAL_DATA_UPDATE=90 HISTORICAL_DATA_UPDATE value
                 * @property {number} REROUTE_MKT_DATA_REQ=91 REROUTE_MKT_DATA_REQ value
                 * @property {number} REROUTE_MKT_DEPTH_REQ=92 REROUTE_MKT_DEPTH_REQ value
                 * @property {number} MARKET_RULE=93 MARKET_RULE value
                 * @property {number} PNL=94 PNL value
                 * @property {number} PNL_SINGLE=95 PNL_SINGLE value
                 * @property {number} HISTORICAL_TICKS=96 HISTORICAL_TICKS value
                 * @property {number} HISTORICAL_TICKS_BID_ASK=97 HISTORICAL_TICKS_BID_ASK value
                 * @property {number} HISTORICAL_TICKS_LAST=98 HISTORICAL_TICKS_LAST value
                 * @property {number} TICK_BY_TICK=99 TICK_BY_TICK value
                 */
                Results.EResults = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "Accept"] = 0;
                    values[valuesById[-1] = "MultiEnd"] = -1;
                    values[valuesById[1] = "TickPriceMessage"] = 1;
                    values[valuesById[2] = "TickSizeMessage"] = 2;
                    values[valuesById[3] = "OrderStatus"] = 3;
                    values[valuesById[4] = "ErrorMessage"] = 4;
                    values[valuesById[5] = "OpenOrder"] = 5;
                    values[valuesById[6] = "ACCT_VALUE"] = 6;
                    values[valuesById[7] = "PORTFOLIO_VALUE"] = 7;
                    values[valuesById[8] = "ACCT_UPDATE_TIME"] = 8;
                    values[valuesById[9] = "NextValidId"] = 9;
                    values[valuesById[10] = "CONTRACT_DATA"] = 10;
                    values[valuesById[11] = "ExecutionData"] = 11;
                    values[valuesById[12] = "MARKET_DEPTH"] = 12;
                    values[valuesById[13] = "MARKET_DEPTH_L2"] = 13;
                    values[valuesById[14] = "NEWS_BULLETINS"] = 14;
                    values[valuesById[15] = "ManagedAccounts"] = 15;
                    values[valuesById[16] = "RECEIVE_FA"] = 16;
                    values[valuesById[17] = "HistoricalData_"] = 17;
                    values[valuesById[18] = "BOND_CONTRACT_DATA"] = 18;
                    values[valuesById[19] = "SCANNER_PARAMETERS"] = 19;
                    values[valuesById[20] = "SCANNER_DATA"] = 20;
                    values[valuesById[21] = "TICK_OPTION_COMPUTATION"] = 21;
                    values[valuesById[45] = "TickGenericMessage"] = 45;
                    values[valuesById[46] = "TickStringMessage"] = 46;
                    values[valuesById[47] = "TICK_EFP"] = 47;
                    values[valuesById[49] = "CurrentTime"] = 49;
                    values[valuesById[50] = "RealTimeBars"] = 50;
                    values[valuesById[51] = "FUNDAMENTAL_DATA"] = 51;
                    values[valuesById[52] = "ContractDataEnd"] = 52;
                    values[valuesById[53] = "OPEN_ORDER_END"] = 53;
                    values[valuesById[54] = "ACCT_DOWNLOAD_END"] = 54;
                    values[valuesById[55] = "EXECUTION_DATA_END"] = 55;
                    values[valuesById[56] = "DELTA_NEUTRAL_VALIDATION"] = 56;
                    values[valuesById[57] = "TickSnapshotEnd"] = 57;
                    values[valuesById[58] = "MarketDataType"] = 58;
                    values[valuesById[59] = "COMMISSION_REPORT"] = 59;
                    values[valuesById[61] = "PositionData"] = 61;
                    values[valuesById[62] = "PositionEnd"] = 62;
                    values[valuesById[63] = "ACCOUNT_SUMMARY"] = 63;
                    values[valuesById[64] = "ACCOUNT_SUMMARY_END"] = 64;
                    values[valuesById[65] = "VERIFY_MESSAGE_API"] = 65;
                    values[valuesById[66] = "VERIFY_COMPLETED"] = 66;
                    values[valuesById[67] = "DISPLAY_GROUP_LIST"] = 67;
                    values[valuesById[68] = "DISPLAY_GROUP_UPDATED"] = 68;
                    values[valuesById[69] = "VERIFY_AND_AUTH_MESSAGE_API"] = 69;
                    values[valuesById[70] = "VERIFY_AND_AUTH_COMPLETED"] = 70;
                    values[valuesById[71] = "PositionMulti"] = 71;
                    values[valuesById[72] = "PositionMultiEnd"] = 72;
                    values[valuesById[73] = "AccountUpdateMulti_"] = 73;
                    values[valuesById[74] = "ACCOUNT_UPDATE_MULTI_END"] = 74;
                    values[valuesById[75] = "SECURITY_DEFINITION_OPTION_PARAMETER"] = 75;
                    values[valuesById[76] = "SECURITY_DEFINITION_OPTION_PARAMETER_END"] = 76;
                    values[valuesById[77] = "SOFT_DOLLAR_TIERS"] = 77;
                    values[valuesById[78] = "FAMILY_CODES"] = 78;
                    values[valuesById[79] = "SYMBOL_SAMPLES"] = 79;
                    values[valuesById[80] = "MKT_DEPTH_EXCHANGES"] = 80;
                    values[valuesById[81] = "TickRequiredParams"] = 81;
                    values[valuesById[82] = "SMART_COMPONENTS"] = 82;
                    values[valuesById[83] = "NEWS_ARTICLE"] = 83;
                    values[valuesById[84] = "TICK_NEWS"] = 84;
                    values[valuesById[85] = "NEWS_PROVIDERS"] = 85;
                    values[valuesById[86] = "HISTORICAL_NEWS"] = 86;
                    values[valuesById[87] = "HISTORICAL_NEWS_END"] = 87;
                    values[valuesById[88] = "HEAD_TIMESTAMP"] = 88;
                    values[valuesById[89] = "HISTOGRAM_DATA"] = 89;
                    values[valuesById[90] = "HISTORICAL_DATA_UPDATE"] = 90;
                    values[valuesById[91] = "REROUTE_MKT_DATA_REQ"] = 91;
                    values[valuesById[92] = "REROUTE_MKT_DEPTH_REQ"] = 92;
                    values[valuesById[93] = "MARKET_RULE"] = 93;
                    values[valuesById[94] = "PNL"] = 94;
                    values[valuesById[95] = "PNL_SINGLE"] = 95;
                    values[valuesById[96] = "HISTORICAL_TICKS"] = 96;
                    values[valuesById[97] = "HISTORICAL_TICKS_BID_ASK"] = 97;
                    values[valuesById[98] = "HISTORICAL_TICKS_LAST"] = 98;
                    values[valuesById[99] = "TICK_BY_TICK"] = 99;
                    return values;
                })();

                return Results;
            })();

            Proto.ComboLeg = (function() {

                /**
                 * Properties of a ComboLeg.
                 * @memberof Jde.Markets.Proto
                 * @interface IComboLeg
                 * @property {number|null} [ConId] ComboLeg ConId
                 * @property {number|null} [Ratio] ComboLeg Ratio
                 * @property {string|null} [Action] ComboLeg Action
                 * @property {string|null} [Exchange] ComboLeg Exchange
                 * @property {number|null} [OpenClose] ComboLeg OpenClose
                 * @property {number|null} [ShortSaleSlot] ComboLeg ShortSaleSlot
                 * @property {string|null} [DesignatedLocation] ComboLeg DesignatedLocation
                 * @property {number|null} [ExemptCode] ComboLeg ExemptCode
                 */

                /**
                 * Constructs a new ComboLeg.
                 * @memberof Jde.Markets.Proto
                 * @classdesc Represents a ComboLeg.
                 * @implements IComboLeg
                 * @constructor
                 * @param {Jde.Markets.Proto.IComboLeg=} [properties] Properties to set
                 */
                function ComboLeg(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ComboLeg ConId.
                 * @member {number} ConId
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.ConId = 0;

                /**
                 * ComboLeg Ratio.
                 * @member {number} Ratio
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.Ratio = 0;

                /**
                 * ComboLeg Action.
                 * @member {string} Action
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.Action = "";

                /**
                 * ComboLeg Exchange.
                 * @member {string} Exchange
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.Exchange = "";

                /**
                 * ComboLeg OpenClose.
                 * @member {number} OpenClose
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.OpenClose = 0;

                /**
                 * ComboLeg ShortSaleSlot.
                 * @member {number} ShortSaleSlot
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.ShortSaleSlot = 0;

                /**
                 * ComboLeg DesignatedLocation.
                 * @member {string} DesignatedLocation
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.DesignatedLocation = "";

                /**
                 * ComboLeg ExemptCode.
                 * @member {number} ExemptCode
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.ExemptCode = 0;

                /**
                 * Creates a new ComboLeg instance using the specified properties.
                 * @function create
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.IComboLeg=} [properties] Properties to set
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg instance
                 */
                ComboLeg.create = function create(properties) {
                    return new ComboLeg(properties);
                };

                /**
                 * Encodes the specified ComboLeg message. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @function encode
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.IComboLeg} message ComboLeg message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ComboLeg.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ConId != null && message.hasOwnProperty("ConId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ConId);
                    if (message.Ratio != null && message.hasOwnProperty("Ratio"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Ratio);
                    if (message.Action != null && message.hasOwnProperty("Action"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.Action);
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.Exchange);
                    if (message.OpenClose != null && message.hasOwnProperty("OpenClose"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.OpenClose);
                    if (message.ShortSaleSlot != null && message.hasOwnProperty("ShortSaleSlot"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ShortSaleSlot);
                    if (message.DesignatedLocation != null && message.hasOwnProperty("DesignatedLocation"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.DesignatedLocation);
                    if (message.ExemptCode != null && message.hasOwnProperty("ExemptCode"))
                        writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ExemptCode);
                    return writer;
                };

                /**
                 * Encodes the specified ComboLeg message, length delimited. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.IComboLeg} message ComboLeg message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ComboLeg.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer.
                 * @function decode
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ComboLeg.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.ComboLeg();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.ConId = reader.uint32();
                            break;
                        case 2:
                            message.Ratio = reader.int32();
                            break;
                        case 3:
                            message.Action = reader.string();
                            break;
                        case 4:
                            message.Exchange = reader.string();
                            break;
                        case 5:
                            message.OpenClose = reader.int32();
                            break;
                        case 6:
                            message.ShortSaleSlot = reader.int32();
                            break;
                        case 7:
                            message.DesignatedLocation = reader.string();
                            break;
                        case 8:
                            message.ExemptCode = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ComboLeg.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ComboLeg message.
                 * @function verify
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ComboLeg.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ConId != null && message.hasOwnProperty("ConId"))
                        if (!$util.isInteger(message.ConId))
                            return "ConId: integer expected";
                    if (message.Ratio != null && message.hasOwnProperty("Ratio"))
                        if (!$util.isInteger(message.Ratio))
                            return "Ratio: integer expected";
                    if (message.Action != null && message.hasOwnProperty("Action"))
                        if (!$util.isString(message.Action))
                            return "Action: string expected";
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        if (!$util.isString(message.Exchange))
                            return "Exchange: string expected";
                    if (message.OpenClose != null && message.hasOwnProperty("OpenClose"))
                        if (!$util.isInteger(message.OpenClose))
                            return "OpenClose: integer expected";
                    if (message.ShortSaleSlot != null && message.hasOwnProperty("ShortSaleSlot"))
                        if (!$util.isInteger(message.ShortSaleSlot))
                            return "ShortSaleSlot: integer expected";
                    if (message.DesignatedLocation != null && message.hasOwnProperty("DesignatedLocation"))
                        if (!$util.isString(message.DesignatedLocation))
                            return "DesignatedLocation: string expected";
                    if (message.ExemptCode != null && message.hasOwnProperty("ExemptCode"))
                        if (!$util.isInteger(message.ExemptCode))
                            return "ExemptCode: integer expected";
                    return null;
                };

                /**
                 * Creates a ComboLeg message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg
                 */
                ComboLeg.fromObject = function fromObject(object) {
                    if (object instanceof $root.Jde.Markets.Proto.ComboLeg)
                        return object;
                    let message = new $root.Jde.Markets.Proto.ComboLeg();
                    if (object.ConId != null)
                        message.ConId = object.ConId >>> 0;
                    if (object.Ratio != null)
                        message.Ratio = object.Ratio | 0;
                    if (object.Action != null)
                        message.Action = String(object.Action);
                    if (object.Exchange != null)
                        message.Exchange = String(object.Exchange);
                    if (object.OpenClose != null)
                        message.OpenClose = object.OpenClose | 0;
                    if (object.ShortSaleSlot != null)
                        message.ShortSaleSlot = object.ShortSaleSlot | 0;
                    if (object.DesignatedLocation != null)
                        message.DesignatedLocation = String(object.DesignatedLocation);
                    if (object.ExemptCode != null)
                        message.ExemptCode = object.ExemptCode | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ComboLeg message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.ComboLeg} message ComboLeg
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ComboLeg.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.ConId = 0;
                        object.Ratio = 0;
                        object.Action = "";
                        object.Exchange = "";
                        object.OpenClose = 0;
                        object.ShortSaleSlot = 0;
                        object.DesignatedLocation = "";
                        object.ExemptCode = 0;
                    }
                    if (message.ConId != null && message.hasOwnProperty("ConId"))
                        object.ConId = message.ConId;
                    if (message.Ratio != null && message.hasOwnProperty("Ratio"))
                        object.Ratio = message.Ratio;
                    if (message.Action != null && message.hasOwnProperty("Action"))
                        object.Action = message.Action;
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        object.Exchange = message.Exchange;
                    if (message.OpenClose != null && message.hasOwnProperty("OpenClose"))
                        object.OpenClose = message.OpenClose;
                    if (message.ShortSaleSlot != null && message.hasOwnProperty("ShortSaleSlot"))
                        object.ShortSaleSlot = message.ShortSaleSlot;
                    if (message.DesignatedLocation != null && message.hasOwnProperty("DesignatedLocation"))
                        object.DesignatedLocation = message.DesignatedLocation;
                    if (message.ExemptCode != null && message.hasOwnProperty("ExemptCode"))
                        object.ExemptCode = message.ExemptCode;
                    return object;
                };

                /**
                 * Converts this ComboLeg to JSON.
                 * @function toJSON
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ComboLeg.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ComboLeg;
            })();

            Proto.DeltaNeutralContract = (function() {

                /**
                 * Properties of a DeltaNeutralContract.
                 * @memberof Jde.Markets.Proto
                 * @interface IDeltaNeutralContract
                 * @property {number|null} [Id] DeltaNeutralContract Id
                 * @property {number|null} [Delta] DeltaNeutralContract Delta
                 * @property {number|null} [Price] DeltaNeutralContract Price
                 */

                /**
                 * Constructs a new DeltaNeutralContract.
                 * @memberof Jde.Markets.Proto
                 * @classdesc Represents a DeltaNeutralContract.
                 * @implements IDeltaNeutralContract
                 * @constructor
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract=} [properties] Properties to set
                 */
                function DeltaNeutralContract(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeltaNeutralContract Id.
                 * @member {number} Id
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 */
                DeltaNeutralContract.prototype.Id = 0;

                /**
                 * DeltaNeutralContract Delta.
                 * @member {number} Delta
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 */
                DeltaNeutralContract.prototype.Delta = 0;

                /**
                 * DeltaNeutralContract Price.
                 * @member {number} Price
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 */
                DeltaNeutralContract.prototype.Price = 0;

                /**
                 * Creates a new DeltaNeutralContract instance using the specified properties.
                 * @function create
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract=} [properties] Properties to set
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract instance
                 */
                DeltaNeutralContract.create = function create(properties) {
                    return new DeltaNeutralContract(properties);
                };

                /**
                 * Encodes the specified DeltaNeutralContract message. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @function encode
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract} message DeltaNeutralContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeltaNeutralContract.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Id);
                    if (message.Delta != null && message.hasOwnProperty("Delta"))
                        writer.uint32(/* id 2, wireType 1 =*/17).double(message.Delta);
                    if (message.Price != null && message.hasOwnProperty("Price"))
                        writer.uint32(/* id 3, wireType 1 =*/25).double(message.Price);
                    return writer;
                };

                /**
                 * Encodes the specified DeltaNeutralContract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract} message DeltaNeutralContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeltaNeutralContract.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer.
                 * @function decode
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeltaNeutralContract.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.DeltaNeutralContract();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.Id = reader.int32();
                            break;
                        case 2:
                            message.Delta = reader.double();
                            break;
                        case 3:
                            message.Price = reader.double();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeltaNeutralContract.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeltaNeutralContract message.
                 * @function verify
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeltaNeutralContract.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        if (!$util.isInteger(message.Id))
                            return "Id: integer expected";
                    if (message.Delta != null && message.hasOwnProperty("Delta"))
                        if (typeof message.Delta !== "number")
                            return "Delta: number expected";
                    if (message.Price != null && message.hasOwnProperty("Price"))
                        if (typeof message.Price !== "number")
                            return "Price: number expected";
                    return null;
                };

                /**
                 * Creates a DeltaNeutralContract message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract
                 */
                DeltaNeutralContract.fromObject = function fromObject(object) {
                    if (object instanceof $root.Jde.Markets.Proto.DeltaNeutralContract)
                        return object;
                    let message = new $root.Jde.Markets.Proto.DeltaNeutralContract();
                    if (object.Id != null)
                        message.Id = object.Id | 0;
                    if (object.Delta != null)
                        message.Delta = Number(object.Delta);
                    if (object.Price != null)
                        message.Price = Number(object.Price);
                    return message;
                };

                /**
                 * Creates a plain object from a DeltaNeutralContract message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.DeltaNeutralContract} message DeltaNeutralContract
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeltaNeutralContract.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.Id = 0;
                        object.Delta = 0;
                        object.Price = 0;
                    }
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        object.Id = message.Id;
                    if (message.Delta != null && message.hasOwnProperty("Delta"))
                        object.Delta = options.json && !isFinite(message.Delta) ? String(message.Delta) : message.Delta;
                    if (message.Price != null && message.hasOwnProperty("Price"))
                        object.Price = options.json && !isFinite(message.Price) ? String(message.Price) : message.Price;
                    return object;
                };

                /**
                 * Converts this DeltaNeutralContract to JSON.
                 * @function toJSON
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeltaNeutralContract.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return DeltaNeutralContract;
            })();

            Proto.Contract = (function() {

                /**
                 * Properties of a Contract.
                 * @memberof Jde.Markets.Proto
                 * @interface IContract
                 * @property {number|null} [Id] Contract Id
                 * @property {string|null} [Symbol] Contract Symbol
                 * @property {string|null} [SecType] Contract SecType
                 * @property {string|null} [LastTradeDateOrContractMonth] Contract LastTradeDateOrContractMonth
                 * @property {number|null} [Strike] Contract Strike
                 * @property {string|null} [Right] Contract Right
                 * @property {string|null} [Multiplier] Contract Multiplier
                 * @property {string|null} [Exchange] Contract Exchange
                 * @property {string|null} [PrimaryExchange] Contract PrimaryExchange
                 * @property {string|null} [Currency] Contract Currency
                 * @property {string|null} [LocalSymbol] Contract LocalSymbol
                 * @property {string|null} [TradingClass] Contract TradingClass
                 * @property {boolean|null} [IncludeExpired] Contract IncludeExpired
                 * @property {string|null} [SecIdType] Contract SecIdType
                 * @property {string|null} [SecId] Contract SecId
                 * @property {string|null} [ComboLegsDescrip] Contract ComboLegsDescrip
                 * @property {Array.<Jde.Markets.Proto.IComboLeg>|null} [ComboLegs] Contract ComboLegs
                 * @property {Jde.Markets.Proto.IDeltaNeutralContract|null} [DeltaNeutral] Contract DeltaNeutral
                 * @property {string|null} [Name] Contract Name
                 * @property {number|null} [Flags] Contract Flags
                 */

                /**
                 * Constructs a new Contract.
                 * @memberof Jde.Markets.Proto
                 * @classdesc Represents a Contract.
                 * @implements IContract
                 * @constructor
                 * @param {Jde.Markets.Proto.IContract=} [properties] Properties to set
                 */
                function Contract(properties) {
                    this.ComboLegs = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Contract Id.
                 * @member {number} Id
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Id = 0;

                /**
                 * Contract Symbol.
                 * @member {string} Symbol
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Symbol = "";

                /**
                 * Contract SecType.
                 * @member {string} SecType
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.SecType = "";

                /**
                 * Contract LastTradeDateOrContractMonth.
                 * @member {string} LastTradeDateOrContractMonth
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.LastTradeDateOrContractMonth = "";

                /**
                 * Contract Strike.
                 * @member {number} Strike
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Strike = 0;

                /**
                 * Contract Right.
                 * @member {string} Right
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Right = "";

                /**
                 * Contract Multiplier.
                 * @member {string} Multiplier
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Multiplier = "";

                /**
                 * Contract Exchange.
                 * @member {string} Exchange
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Exchange = "";

                /**
                 * Contract PrimaryExchange.
                 * @member {string} PrimaryExchange
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.PrimaryExchange = "";

                /**
                 * Contract Currency.
                 * @member {string} Currency
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Currency = "";

                /**
                 * Contract LocalSymbol.
                 * @member {string} LocalSymbol
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.LocalSymbol = "";

                /**
                 * Contract TradingClass.
                 * @member {string} TradingClass
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.TradingClass = "";

                /**
                 * Contract IncludeExpired.
                 * @member {boolean} IncludeExpired
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.IncludeExpired = false;

                /**
                 * Contract SecIdType.
                 * @member {string} SecIdType
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.SecIdType = "";

                /**
                 * Contract SecId.
                 * @member {string} SecId
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.SecId = "";

                /**
                 * Contract ComboLegsDescrip.
                 * @member {string} ComboLegsDescrip
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.ComboLegsDescrip = "";

                /**
                 * Contract ComboLegs.
                 * @member {Array.<Jde.Markets.Proto.IComboLeg>} ComboLegs
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.ComboLegs = $util.emptyArray;

                /**
                 * Contract DeltaNeutral.
                 * @member {Jde.Markets.Proto.IDeltaNeutralContract|null|undefined} DeltaNeutral
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.DeltaNeutral = null;

                /**
                 * Contract Name.
                 * @member {string} Name
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Name = "";

                /**
                 * Contract Flags.
                 * @member {number} Flags
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Flags = 0;

                /**
                 * Creates a new Contract instance using the specified properties.
                 * @function create
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.IContract=} [properties] Properties to set
                 * @returns {Jde.Markets.Proto.Contract} Contract instance
                 */
                Contract.create = function create(properties) {
                    return new Contract(properties);
                };

                /**
                 * Encodes the specified Contract message. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @function encode
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.IContract} message Contract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Contract.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Id);
                    if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.Symbol);
                    if (message.SecType != null && message.hasOwnProperty("SecType"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.SecType);
                    if (message.LastTradeDateOrContractMonth != null && message.hasOwnProperty("LastTradeDateOrContractMonth"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.LastTradeDateOrContractMonth);
                    if (message.Strike != null && message.hasOwnProperty("Strike"))
                        writer.uint32(/* id 5, wireType 1 =*/41).double(message.Strike);
                    if (message.Right != null && message.hasOwnProperty("Right"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.Right);
                    if (message.Multiplier != null && message.hasOwnProperty("Multiplier"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.Multiplier);
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.Exchange);
                    if (message.PrimaryExchange != null && message.hasOwnProperty("PrimaryExchange"))
                        writer.uint32(/* id 9, wireType 2 =*/74).string(message.PrimaryExchange);
                    if (message.Currency != null && message.hasOwnProperty("Currency"))
                        writer.uint32(/* id 10, wireType 2 =*/82).string(message.Currency);
                    if (message.LocalSymbol != null && message.hasOwnProperty("LocalSymbol"))
                        writer.uint32(/* id 11, wireType 2 =*/90).string(message.LocalSymbol);
                    if (message.TradingClass != null && message.hasOwnProperty("TradingClass"))
                        writer.uint32(/* id 12, wireType 2 =*/98).string(message.TradingClass);
                    if (message.IncludeExpired != null && message.hasOwnProperty("IncludeExpired"))
                        writer.uint32(/* id 13, wireType 0 =*/104).bool(message.IncludeExpired);
                    if (message.SecIdType != null && message.hasOwnProperty("SecIdType"))
                        writer.uint32(/* id 14, wireType 2 =*/114).string(message.SecIdType);
                    if (message.SecId != null && message.hasOwnProperty("SecId"))
                        writer.uint32(/* id 15, wireType 2 =*/122).string(message.SecId);
                    if (message.ComboLegsDescrip != null && message.hasOwnProperty("ComboLegsDescrip"))
                        writer.uint32(/* id 16, wireType 2 =*/130).string(message.ComboLegsDescrip);
                    if (message.ComboLegs != null && message.ComboLegs.length)
                        for (let i = 0; i < message.ComboLegs.length; ++i)
                            $root.Jde.Markets.Proto.ComboLeg.encode(message.ComboLegs[i], writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                    if (message.DeltaNeutral != null && message.hasOwnProperty("DeltaNeutral"))
                        $root.Jde.Markets.Proto.DeltaNeutralContract.encode(message.DeltaNeutral, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                    if (message.Name != null && message.hasOwnProperty("Name"))
                        writer.uint32(/* id 19, wireType 2 =*/154).string(message.Name);
                    if (message.Flags != null && message.hasOwnProperty("Flags"))
                        writer.uint32(/* id 20, wireType 0 =*/160).uint32(message.Flags);
                    return writer;
                };

                /**
                 * Encodes the specified Contract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.IContract} message Contract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Contract.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Contract message from the specified reader or buffer.
                 * @function decode
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Jde.Markets.Proto.Contract} Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Contract.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Contract();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.Id = reader.uint32();
                            break;
                        case 2:
                            message.Symbol = reader.string();
                            break;
                        case 3:
                            message.SecType = reader.string();
                            break;
                        case 4:
                            message.LastTradeDateOrContractMonth = reader.string();
                            break;
                        case 5:
                            message.Strike = reader.double();
                            break;
                        case 6:
                            message.Right = reader.string();
                            break;
                        case 7:
                            message.Multiplier = reader.string();
                            break;
                        case 8:
                            message.Exchange = reader.string();
                            break;
                        case 9:
                            message.PrimaryExchange = reader.string();
                            break;
                        case 10:
                            message.Currency = reader.string();
                            break;
                        case 11:
                            message.LocalSymbol = reader.string();
                            break;
                        case 12:
                            message.TradingClass = reader.string();
                            break;
                        case 13:
                            message.IncludeExpired = reader.bool();
                            break;
                        case 14:
                            message.SecIdType = reader.string();
                            break;
                        case 15:
                            message.SecId = reader.string();
                            break;
                        case 16:
                            message.ComboLegsDescrip = reader.string();
                            break;
                        case 17:
                            if (!(message.ComboLegs && message.ComboLegs.length))
                                message.ComboLegs = [];
                            message.ComboLegs.push($root.Jde.Markets.Proto.ComboLeg.decode(reader, reader.uint32()));
                            break;
                        case 18:
                            message.DeltaNeutral = $root.Jde.Markets.Proto.DeltaNeutralContract.decode(reader, reader.uint32());
                            break;
                        case 19:
                            message.Name = reader.string();
                            break;
                        case 20:
                            message.Flags = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Contract message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Jde.Markets.Proto.Contract} Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Contract.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Contract message.
                 * @function verify
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Contract.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        if (!$util.isInteger(message.Id))
                            return "Id: integer expected";
                    if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                        if (!$util.isString(message.Symbol))
                            return "Symbol: string expected";
                    if (message.SecType != null && message.hasOwnProperty("SecType"))
                        if (!$util.isString(message.SecType))
                            return "SecType: string expected";
                    if (message.LastTradeDateOrContractMonth != null && message.hasOwnProperty("LastTradeDateOrContractMonth"))
                        if (!$util.isString(message.LastTradeDateOrContractMonth))
                            return "LastTradeDateOrContractMonth: string expected";
                    if (message.Strike != null && message.hasOwnProperty("Strike"))
                        if (typeof message.Strike !== "number")
                            return "Strike: number expected";
                    if (message.Right != null && message.hasOwnProperty("Right"))
                        if (!$util.isString(message.Right))
                            return "Right: string expected";
                    if (message.Multiplier != null && message.hasOwnProperty("Multiplier"))
                        if (!$util.isString(message.Multiplier))
                            return "Multiplier: string expected";
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        if (!$util.isString(message.Exchange))
                            return "Exchange: string expected";
                    if (message.PrimaryExchange != null && message.hasOwnProperty("PrimaryExchange"))
                        if (!$util.isString(message.PrimaryExchange))
                            return "PrimaryExchange: string expected";
                    if (message.Currency != null && message.hasOwnProperty("Currency"))
                        if (!$util.isString(message.Currency))
                            return "Currency: string expected";
                    if (message.LocalSymbol != null && message.hasOwnProperty("LocalSymbol"))
                        if (!$util.isString(message.LocalSymbol))
                            return "LocalSymbol: string expected";
                    if (message.TradingClass != null && message.hasOwnProperty("TradingClass"))
                        if (!$util.isString(message.TradingClass))
                            return "TradingClass: string expected";
                    if (message.IncludeExpired != null && message.hasOwnProperty("IncludeExpired"))
                        if (typeof message.IncludeExpired !== "boolean")
                            return "IncludeExpired: boolean expected";
                    if (message.SecIdType != null && message.hasOwnProperty("SecIdType"))
                        if (!$util.isString(message.SecIdType))
                            return "SecIdType: string expected";
                    if (message.SecId != null && message.hasOwnProperty("SecId"))
                        if (!$util.isString(message.SecId))
                            return "SecId: string expected";
                    if (message.ComboLegsDescrip != null && message.hasOwnProperty("ComboLegsDescrip"))
                        if (!$util.isString(message.ComboLegsDescrip))
                            return "ComboLegsDescrip: string expected";
                    if (message.ComboLegs != null && message.hasOwnProperty("ComboLegs")) {
                        if (!Array.isArray(message.ComboLegs))
                            return "ComboLegs: array expected";
                        for (let i = 0; i < message.ComboLegs.length; ++i) {
                            let error = $root.Jde.Markets.Proto.ComboLeg.verify(message.ComboLegs[i]);
                            if (error)
                                return "ComboLegs." + error;
                        }
                    }
                    if (message.DeltaNeutral != null && message.hasOwnProperty("DeltaNeutral")) {
                        let error = $root.Jde.Markets.Proto.DeltaNeutralContract.verify(message.DeltaNeutral);
                        if (error)
                            return "DeltaNeutral." + error;
                    }
                    if (message.Name != null && message.hasOwnProperty("Name"))
                        if (!$util.isString(message.Name))
                            return "Name: string expected";
                    if (message.Flags != null && message.hasOwnProperty("Flags"))
                        if (!$util.isInteger(message.Flags))
                            return "Flags: integer expected";
                    return null;
                };

                /**
                 * Creates a Contract message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Jde.Markets.Proto.Contract} Contract
                 */
                Contract.fromObject = function fromObject(object) {
                    if (object instanceof $root.Jde.Markets.Proto.Contract)
                        return object;
                    let message = new $root.Jde.Markets.Proto.Contract();
                    if (object.Id != null)
                        message.Id = object.Id >>> 0;
                    if (object.Symbol != null)
                        message.Symbol = String(object.Symbol);
                    if (object.SecType != null)
                        message.SecType = String(object.SecType);
                    if (object.LastTradeDateOrContractMonth != null)
                        message.LastTradeDateOrContractMonth = String(object.LastTradeDateOrContractMonth);
                    if (object.Strike != null)
                        message.Strike = Number(object.Strike);
                    if (object.Right != null)
                        message.Right = String(object.Right);
                    if (object.Multiplier != null)
                        message.Multiplier = String(object.Multiplier);
                    if (object.Exchange != null)
                        message.Exchange = String(object.Exchange);
                    if (object.PrimaryExchange != null)
                        message.PrimaryExchange = String(object.PrimaryExchange);
                    if (object.Currency != null)
                        message.Currency = String(object.Currency);
                    if (object.LocalSymbol != null)
                        message.LocalSymbol = String(object.LocalSymbol);
                    if (object.TradingClass != null)
                        message.TradingClass = String(object.TradingClass);
                    if (object.IncludeExpired != null)
                        message.IncludeExpired = Boolean(object.IncludeExpired);
                    if (object.SecIdType != null)
                        message.SecIdType = String(object.SecIdType);
                    if (object.SecId != null)
                        message.SecId = String(object.SecId);
                    if (object.ComboLegsDescrip != null)
                        message.ComboLegsDescrip = String(object.ComboLegsDescrip);
                    if (object.ComboLegs) {
                        if (!Array.isArray(object.ComboLegs))
                            throw TypeError(".Jde.Markets.Proto.Contract.ComboLegs: array expected");
                        message.ComboLegs = [];
                        for (let i = 0; i < object.ComboLegs.length; ++i) {
                            if (typeof object.ComboLegs[i] !== "object")
                                throw TypeError(".Jde.Markets.Proto.Contract.ComboLegs: object expected");
                            message.ComboLegs[i] = $root.Jde.Markets.Proto.ComboLeg.fromObject(object.ComboLegs[i]);
                        }
                    }
                    if (object.DeltaNeutral != null) {
                        if (typeof object.DeltaNeutral !== "object")
                            throw TypeError(".Jde.Markets.Proto.Contract.DeltaNeutral: object expected");
                        message.DeltaNeutral = $root.Jde.Markets.Proto.DeltaNeutralContract.fromObject(object.DeltaNeutral);
                    }
                    if (object.Name != null)
                        message.Name = String(object.Name);
                    if (object.Flags != null)
                        message.Flags = object.Flags >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Contract message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.Contract} message Contract
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Contract.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.ComboLegs = [];
                    if (options.defaults) {
                        object.Id = 0;
                        object.Symbol = "";
                        object.SecType = "";
                        object.LastTradeDateOrContractMonth = "";
                        object.Strike = 0;
                        object.Right = "";
                        object.Multiplier = "";
                        object.Exchange = "";
                        object.PrimaryExchange = "";
                        object.Currency = "";
                        object.LocalSymbol = "";
                        object.TradingClass = "";
                        object.IncludeExpired = false;
                        object.SecIdType = "";
                        object.SecId = "";
                        object.ComboLegsDescrip = "";
                        object.DeltaNeutral = null;
                        object.Name = "";
                        object.Flags = 0;
                    }
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        object.Id = message.Id;
                    if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                        object.Symbol = message.Symbol;
                    if (message.SecType != null && message.hasOwnProperty("SecType"))
                        object.SecType = message.SecType;
                    if (message.LastTradeDateOrContractMonth != null && message.hasOwnProperty("LastTradeDateOrContractMonth"))
                        object.LastTradeDateOrContractMonth = message.LastTradeDateOrContractMonth;
                    if (message.Strike != null && message.hasOwnProperty("Strike"))
                        object.Strike = options.json && !isFinite(message.Strike) ? String(message.Strike) : message.Strike;
                    if (message.Right != null && message.hasOwnProperty("Right"))
                        object.Right = message.Right;
                    if (message.Multiplier != null && message.hasOwnProperty("Multiplier"))
                        object.Multiplier = message.Multiplier;
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        object.Exchange = message.Exchange;
                    if (message.PrimaryExchange != null && message.hasOwnProperty("PrimaryExchange"))
                        object.PrimaryExchange = message.PrimaryExchange;
                    if (message.Currency != null && message.hasOwnProperty("Currency"))
                        object.Currency = message.Currency;
                    if (message.LocalSymbol != null && message.hasOwnProperty("LocalSymbol"))
                        object.LocalSymbol = message.LocalSymbol;
                    if (message.TradingClass != null && message.hasOwnProperty("TradingClass"))
                        object.TradingClass = message.TradingClass;
                    if (message.IncludeExpired != null && message.hasOwnProperty("IncludeExpired"))
                        object.IncludeExpired = message.IncludeExpired;
                    if (message.SecIdType != null && message.hasOwnProperty("SecIdType"))
                        object.SecIdType = message.SecIdType;
                    if (message.SecId != null && message.hasOwnProperty("SecId"))
                        object.SecId = message.SecId;
                    if (message.ComboLegsDescrip != null && message.hasOwnProperty("ComboLegsDescrip"))
                        object.ComboLegsDescrip = message.ComboLegsDescrip;
                    if (message.ComboLegs && message.ComboLegs.length) {
                        object.ComboLegs = [];
                        for (let j = 0; j < message.ComboLegs.length; ++j)
                            object.ComboLegs[j] = $root.Jde.Markets.Proto.ComboLeg.toObject(message.ComboLegs[j], options);
                    }
                    if (message.DeltaNeutral != null && message.hasOwnProperty("DeltaNeutral"))
                        object.DeltaNeutral = $root.Jde.Markets.Proto.DeltaNeutralContract.toObject(message.DeltaNeutral, options);
                    if (message.Name != null && message.hasOwnProperty("Name"))
                        object.Name = message.Name;
                    if (message.Flags != null && message.hasOwnProperty("Flags"))
                        object.Flags = message.Flags;
                    return object;
                };

                /**
                 * Converts this Contract to JSON.
                 * @function toJSON
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Contract.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Contract;
            })();

            return Proto;
        })();

        return Markets;
    })();

    return Jde;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
