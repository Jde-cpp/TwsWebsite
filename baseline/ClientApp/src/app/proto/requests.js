/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots.request_root || ($protobuf.roots.request_root = {});

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

            Proto.Requests = (function() {

                /**
                 * Namespace Requests.
                 * @memberof Jde.Markets.Proto
                 * @namespace
                 */
                const Requests = {};

                Requests.GenericRequest = (function() {

                    /**
                     * Properties of a GenericRequest.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IGenericRequest
                     * @property {Jde.Markets.Proto.Requests.ERequests|null} [Type] GenericRequest Type
                     * @property {number|null} [RequestId] GenericRequest RequestId
                     */

                    /**
                     * Constructs a new GenericRequest.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a GenericRequest.
                     * @implements IGenericRequest
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IGenericRequest=} [properties] Properties to set
                     */
                    function GenericRequest(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * GenericRequest Type.
                     * @member {Jde.Markets.Proto.Requests.ERequests} Type
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @instance
                     */
                    GenericRequest.prototype.Type = 0;

                    /**
                     * GenericRequest RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @instance
                     */
                    GenericRequest.prototype.RequestId = 0;

                    /**
                     * Creates a new GenericRequest instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IGenericRequest=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.GenericRequest} GenericRequest instance
                     */
                    GenericRequest.create = function create(properties) {
                        return new GenericRequest(properties);
                    };

                    /**
                     * Encodes the specified GenericRequest message. Does not implicitly {@link Jde.Markets.Proto.Requests.GenericRequest.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IGenericRequest} message GenericRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GenericRequest.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Type);
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RequestId);
                        return writer;
                    };

                    /**
                     * Encodes the specified GenericRequest message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.GenericRequest.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IGenericRequest} message GenericRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GenericRequest.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a GenericRequest message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.GenericRequest} GenericRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GenericRequest.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.GenericRequest();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Type = reader.int32();
                                break;
                            case 2:
                                message.RequestId = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a GenericRequest message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.GenericRequest} GenericRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GenericRequest.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a GenericRequest message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GenericRequest.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            switch (message.Type) {
                            default:
                                return "Type: enum value expected";
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
                                break;
                            }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        return null;
                    };

                    /**
                     * Creates a GenericRequest message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.GenericRequest} GenericRequest
                     */
                    GenericRequest.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.GenericRequest)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.GenericRequest();
                        switch (object.Type) {
                        case "Ping":
                        case 0:
                            message.Type = 0;
                            break;
                        case "MarketData":
                        case 1:
                            message.Type = 1;
                            break;
                        case "CANCEL_MKT_DATA":
                        case 2:
                            message.Type = 2;
                            break;
                        case "PlaceOrder":
                        case 3:
                            message.Type = 3;
                            break;
                        case "CancelOrder":
                        case 4:
                            message.Type = 4;
                            break;
                        case "REQ_OPEN_ORDERS":
                        case 5:
                            message.Type = 5;
                            break;
                        case "REQ_ACCT_DATA":
                        case 6:
                            message.Type = 6;
                            break;
                        case "REQ_EXECUTIONS":
                        case 7:
                            message.Type = 7;
                            break;
                        case "RequestIds":
                        case 8:
                            message.Type = 8;
                            break;
                        case "REQ_CONTRACT_DATA":
                        case 9:
                            message.Type = 9;
                            break;
                        case "REQ_MKT_DEPTH":
                        case 10:
                            message.Type = 10;
                            break;
                        case "CANCEL_MKT_DEPTH":
                        case 11:
                            message.Type = 11;
                            break;
                        case "REQ_NEWS_BULLETINS":
                        case 12:
                            message.Type = 12;
                            break;
                        case "CANCEL_NEWS_BULLETINS":
                        case 13:
                            message.Type = 13;
                            break;
                        case "SET_SERVER_LOGLEVEL":
                        case 14:
                            message.Type = 14;
                            break;
                        case "REQ_AUTO_OPEN_ORDERS":
                        case 15:
                            message.Type = 15;
                            break;
                        case "REQ_ALL_OPEN_ORDERS":
                        case 16:
                            message.Type = 16;
                            break;
                        case "ManagedAccounts":
                        case 17:
                            message.Type = 17;
                            break;
                        case "REQ_FA":
                        case 18:
                            message.Type = 18;
                            break;
                        case "REPLACE_FA":
                        case 19:
                            message.Type = 19;
                            break;
                        case "REQ_HISTORICAL_DATA":
                        case 20:
                            message.Type = 20;
                            break;
                        case "EXERCISE_OPTIONS":
                        case 21:
                            message.Type = 21;
                            break;
                        case "REQ_SCANNER_SUBSCRIPTION":
                        case 22:
                            message.Type = 22;
                            break;
                        case "CANCEL_SCANNER_SUBSCRIPTION":
                        case 23:
                            message.Type = 23;
                            break;
                        case "REQ_SCANNER_PARAMETERS":
                        case 24:
                            message.Type = 24;
                            break;
                        case "CANCEL_HISTORICAL_DATA":
                        case 25:
                            message.Type = 25;
                            break;
                        case "CurrentTime":
                        case 49:
                            message.Type = 49;
                            break;
                        case "RequestRealTimeBars":
                        case 50:
                            message.Type = 50;
                            break;
                        case "CANCEL_REAL_TIME_BARS":
                        case 51:
                            message.Type = 51;
                            break;
                        case "REQ_FUNDAMENTAL_DATA":
                        case 52:
                            message.Type = 52;
                            break;
                        case "CANCEL_FUNDAMENTAL_DATA":
                        case 53:
                            message.Type = 53;
                            break;
                        case "REQ_CALC_IMPLIED_VOLAT":
                        case 54:
                            message.Type = 54;
                            break;
                        case "REQ_CALC_OPTION_PRICE":
                        case 55:
                            message.Type = 55;
                            break;
                        case "CANCEL_CALC_IMPLIED_VOLAT":
                        case 56:
                            message.Type = 56;
                            break;
                        case "CANCEL_CALC_OPTION_PRICE":
                        case 57:
                            message.Type = 57;
                            break;
                        case "REQ_GLOBAL_CANCEL":
                        case 58:
                            message.Type = 58;
                            break;
                        case "REQ_MARKET_DATA_TYPE":
                        case 59:
                            message.Type = 59;
                            break;
                        case "Positions":
                        case 61:
                            message.Type = 61;
                            break;
                        case "REQ_ACCOUNT_SUMMARY":
                        case 62:
                            message.Type = 62;
                            break;
                        case "CANCEL_ACCOUNT_SUMMARY":
                        case 63:
                            message.Type = 63;
                            break;
                        case "CANCEL_POSITIONS":
                        case 64:
                            message.Type = 64;
                            break;
                        case "VERIFY_REQUEST":
                        case 65:
                            message.Type = 65;
                            break;
                        case "VERIFY_MESSAGE":
                        case 66:
                            message.Type = 66;
                            break;
                        case "QUERY_DISPLAY_GROUPS":
                        case 67:
                            message.Type = 67;
                            break;
                        case "SUBSCRIBE_TO_GROUP_EVENTS":
                        case 68:
                            message.Type = 68;
                            break;
                        case "UPDATE_DISPLAY_GROUP":
                        case 69:
                            message.Type = 69;
                            break;
                        case "UNSUBSCRIBE_FROM_GROUP_EVENTS":
                        case 70:
                            message.Type = 70;
                            break;
                        case "StartApi":
                        case 71:
                            message.Type = 71;
                            break;
                        case "VERIFY_AND_AUTH_REQUEST":
                        case 72:
                            message.Type = 72;
                            break;
                        case "VERIFY_AND_AUTH_MESSAGE":
                        case 73:
                            message.Type = 73;
                            break;
                        case "REQ_POSITIONS_MULTI":
                        case 74:
                            message.Type = 74;
                            break;
                        case "CANCEL_POSITIONS_MULTI":
                        case 75:
                            message.Type = 75;
                            break;
                        case "RequestAccountUpdatesMulti_":
                        case 76:
                            message.Type = 76;
                            break;
                        case "CANCEL_ACCOUNT_UPDATES_MULTI":
                        case 77:
                            message.Type = 77;
                            break;
                        case "REQ_SEC_DEF_OPT_PARAMS":
                        case 78:
                            message.Type = 78;
                            break;
                        case "REQ_SOFT_DOLLAR_TIERS":
                        case 79:
                            message.Type = 79;
                            break;
                        case "REQ_FAMILY_CODES":
                        case 80:
                            message.Type = 80;
                            break;
                        case "REQ_MATCHING_SYMBOLS":
                        case 81:
                            message.Type = 81;
                            break;
                        case "REQ_MKT_DEPTH_EXCHANGES":
                        case 82:
                            message.Type = 82;
                            break;
                        case "REQ_SMART_COMPONENTS":
                        case 83:
                            message.Type = 83;
                            break;
                        case "REQ_NEWS_ARTICLE":
                        case 84:
                            message.Type = 84;
                            break;
                        case "REQ_NEWS_PROVIDERS":
                        case 85:
                            message.Type = 85;
                            break;
                        case "REQ_HISTORICAL_NEWS":
                        case 86:
                            message.Type = 86;
                            break;
                        case "REQ_HEAD_TIMESTAMP":
                        case 87:
                            message.Type = 87;
                            break;
                        case "REQ_HISTOGRAM_DATA":
                        case 88:
                            message.Type = 88;
                            break;
                        case "CANCEL_HISTOGRAM_DATA":
                        case 89:
                            message.Type = 89;
                            break;
                        case "CANCEL_HEAD_TIMESTAMP":
                        case 90:
                            message.Type = 90;
                            break;
                        case "REQ_MARKET_RULE":
                        case 91:
                            message.Type = 91;
                            break;
                        case "REQ_PNL":
                        case 92:
                            message.Type = 92;
                            break;
                        case "CANCEL_PNL":
                        case 93:
                            message.Type = 93;
                            break;
                        case "REQ_PNL_SINGLE":
                        case 94:
                            message.Type = 94;
                            break;
                        case "CANCEL_PNL_SINGLE":
                        case 95:
                            message.Type = 95;
                            break;
                        case "REQ_HISTORICAL_TICKS":
                        case 96:
                            message.Type = 96;
                            break;
                        case "REQ_TICK_BY_TICK_DATA":
                        case 97:
                            message.Type = 97;
                            break;
                        case "CANCEL_TICK_BY_TICK_DATA":
                        case 98:
                            message.Type = 98;
                            break;
                        }
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a GenericRequest message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @static
                     * @param {Jde.Markets.Proto.Requests.GenericRequest} message GenericRequest
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GenericRequest.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Type = options.enums === String ? "Ping" : 0;
                            object.RequestId = 0;
                        }
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            object.Type = options.enums === String ? $root.Jde.Markets.Proto.Requests.ERequests[message.Type] : message.Type;
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        return object;
                    };

                    /**
                     * Converts this GenericRequest to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.GenericRequest
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GenericRequest.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return GenericRequest;
                })();

                Requests.RequestAccountUpdates = (function() {

                    /**
                     * Properties of a RequestAccountUpdates.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestAccountUpdates
                     * @property {boolean|null} [Subscribe] RequestAccountUpdates Subscribe
                     * @property {string|null} [AccountNumber] RequestAccountUpdates AccountNumber
                     */

                    /**
                     * Constructs a new RequestAccountUpdates.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestAccountUpdates.
                     * @implements IRequestAccountUpdates
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdates=} [properties] Properties to set
                     */
                    function RequestAccountUpdates(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestAccountUpdates Subscribe.
                     * @member {boolean} Subscribe
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @instance
                     */
                    RequestAccountUpdates.prototype.Subscribe = false;

                    /**
                     * RequestAccountUpdates AccountNumber.
                     * @member {string} AccountNumber
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @instance
                     */
                    RequestAccountUpdates.prototype.AccountNumber = "";

                    /**
                     * Creates a new RequestAccountUpdates instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdates=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdates} RequestAccountUpdates instance
                     */
                    RequestAccountUpdates.create = function create(properties) {
                        return new RequestAccountUpdates(properties);
                    };

                    /**
                     * Encodes the specified RequestAccountUpdates message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdates.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdates} message RequestAccountUpdates message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestAccountUpdates.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Subscribe != null && message.hasOwnProperty("Subscribe"))
                            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.Subscribe);
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.AccountNumber);
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestAccountUpdates message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdates.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdates} message RequestAccountUpdates message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestAccountUpdates.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestAccountUpdates message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdates} RequestAccountUpdates
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestAccountUpdates.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestAccountUpdates();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Subscribe = reader.bool();
                                break;
                            case 2:
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
                     * Decodes a RequestAccountUpdates message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdates} RequestAccountUpdates
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestAccountUpdates.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestAccountUpdates message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestAccountUpdates.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Subscribe != null && message.hasOwnProperty("Subscribe"))
                            if (typeof message.Subscribe !== "boolean")
                                return "Subscribe: boolean expected";
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            if (!$util.isString(message.AccountNumber))
                                return "AccountNumber: string expected";
                        return null;
                    };

                    /**
                     * Creates a RequestAccountUpdates message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdates} RequestAccountUpdates
                     */
                    RequestAccountUpdates.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestAccountUpdates)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestAccountUpdates();
                        if (object.Subscribe != null)
                            message.Subscribe = Boolean(object.Subscribe);
                        if (object.AccountNumber != null)
                            message.AccountNumber = String(object.AccountNumber);
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestAccountUpdates message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestAccountUpdates} message RequestAccountUpdates
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestAccountUpdates.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Subscribe = false;
                            object.AccountNumber = "";
                        }
                        if (message.Subscribe != null && message.hasOwnProperty("Subscribe"))
                            object.Subscribe = message.Subscribe;
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            object.AccountNumber = message.AccountNumber;
                        return object;
                    };

                    /**
                     * Converts this RequestAccountUpdates to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdates
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestAccountUpdates.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestAccountUpdates;
                })();

                Requests.RequestAccountUpdatesMulti = (function() {

                    /**
                     * Properties of a RequestAccountUpdatesMulti.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestAccountUpdatesMulti
                     * @property {number|null} [RequestId] RequestAccountUpdatesMulti RequestId
                     * @property {string|null} [AccountNumber] RequestAccountUpdatesMulti AccountNumber
                     * @property {string|null} [ModelCode] RequestAccountUpdatesMulti ModelCode
                     * @property {boolean|null} [LedgerAndNlv] RequestAccountUpdatesMulti LedgerAndNlv
                     */

                    /**
                     * Constructs a new RequestAccountUpdatesMulti.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestAccountUpdatesMulti.
                     * @implements IRequestAccountUpdatesMulti
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti=} [properties] Properties to set
                     */
                    function RequestAccountUpdatesMulti(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestAccountUpdatesMulti RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @instance
                     */
                    RequestAccountUpdatesMulti.prototype.RequestId = 0;

                    /**
                     * RequestAccountUpdatesMulti AccountNumber.
                     * @member {string} AccountNumber
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @instance
                     */
                    RequestAccountUpdatesMulti.prototype.AccountNumber = "";

                    /**
                     * RequestAccountUpdatesMulti ModelCode.
                     * @member {string} ModelCode
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @instance
                     */
                    RequestAccountUpdatesMulti.prototype.ModelCode = "";

                    /**
                     * RequestAccountUpdatesMulti LedgerAndNlv.
                     * @member {boolean} LedgerAndNlv
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @instance
                     */
                    RequestAccountUpdatesMulti.prototype.LedgerAndNlv = false;

                    /**
                     * Creates a new RequestAccountUpdatesMulti instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti} RequestAccountUpdatesMulti instance
                     */
                    RequestAccountUpdatesMulti.create = function create(properties) {
                        return new RequestAccountUpdatesMulti(properties);
                    };

                    /**
                     * Encodes the specified RequestAccountUpdatesMulti message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti} message RequestAccountUpdatesMulti message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestAccountUpdatesMulti.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.AccountNumber);
                        if (message.ModelCode != null && message.hasOwnProperty("ModelCode"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.ModelCode);
                        if (message.LedgerAndNlv != null && message.hasOwnProperty("LedgerAndNlv"))
                            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.LedgerAndNlv);
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestAccountUpdatesMulti message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti} message RequestAccountUpdatesMulti message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestAccountUpdatesMulti.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestAccountUpdatesMulti message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti} RequestAccountUpdatesMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestAccountUpdatesMulti.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.AccountNumber = reader.string();
                                break;
                            case 3:
                                message.ModelCode = reader.string();
                                break;
                            case 4:
                                message.LedgerAndNlv = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestAccountUpdatesMulti message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti} RequestAccountUpdatesMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestAccountUpdatesMulti.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestAccountUpdatesMulti message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestAccountUpdatesMulti.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            if (!$util.isString(message.AccountNumber))
                                return "AccountNumber: string expected";
                        if (message.ModelCode != null && message.hasOwnProperty("ModelCode"))
                            if (!$util.isString(message.ModelCode))
                                return "ModelCode: string expected";
                        if (message.LedgerAndNlv != null && message.hasOwnProperty("LedgerAndNlv"))
                            if (typeof message.LedgerAndNlv !== "boolean")
                                return "LedgerAndNlv: boolean expected";
                        return null;
                    };

                    /**
                     * Creates a RequestAccountUpdatesMulti message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti} RequestAccountUpdatesMulti
                     */
                    RequestAccountUpdatesMulti.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.AccountNumber != null)
                            message.AccountNumber = String(object.AccountNumber);
                        if (object.ModelCode != null)
                            message.ModelCode = String(object.ModelCode);
                        if (object.LedgerAndNlv != null)
                            message.LedgerAndNlv = Boolean(object.LedgerAndNlv);
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestAccountUpdatesMulti message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti} message RequestAccountUpdatesMulti
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestAccountUpdatesMulti.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.AccountNumber = "";
                            object.ModelCode = "";
                            object.LedgerAndNlv = false;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            object.AccountNumber = message.AccountNumber;
                        if (message.ModelCode != null && message.hasOwnProperty("ModelCode"))
                            object.ModelCode = message.ModelCode;
                        if (message.LedgerAndNlv != null && message.hasOwnProperty("LedgerAndNlv"))
                            object.LedgerAndNlv = message.LedgerAndNlv;
                        return object;
                    };

                    /**
                     * Converts this RequestAccountUpdatesMulti to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestAccountUpdatesMulti.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestAccountUpdatesMulti;
                })();

                /**
                 * ETickList enum.
                 * @name Jde.Markets.Proto.Requests.ETickList
                 * @enum {string}
                 * @property {number} TickListNone=0 TickListNone value
                 * @property {number} OptionVolume=100 OptionVolume value
                 * @property {number} OptionOpenInterest=101 OptionOpenInterest value
                 * @property {number} AverageOptVolume=105 AverageOptVolume value
                 * @property {number} Impvolat=106 Impvolat value
                 * @property {number} Climpvlt=107 Climpvlt value
                 * @property {number} Bondanalyticdata=125 Bondanalyticdata value
                 * @property {number} MiscStats=165 MiscStats value
                 * @property {number} CScreen=166 CScreen value
                 * @property {number} CreditmanMarkPrice=221 CreditmanMarkPrice value
                 * @property {number} Auction=225 Auction value
                 * @property {number} PlPrice=232 PlPrice value
                 * @property {number} RTVolume=233 RTVolume value
                 * @property {number} Inventory=236 Inventory value
                 * @property {number} Fundamentals=258 Fundamentals value
                 * @property {number} Ivclose=291 Ivclose value
                 * @property {number} WideNews=292 WideNews value
                 * @property {number} TradeCount=293 TradeCount value
                 * @property {number} TradeRate=294 TradeRate value
                 * @property {number} VolumeRate=295 VolumeRate value
                 * @property {number} LastRTHTrade=318 LastRTHTrade value
                 * @property {number} ParticipationMonitor=370 ParticipationMonitor value
                 * @property {number} RTTrdVolume=375 RTTrdVolume value
                 * @property {number} CttTickTag=377 CttTickTag value
                 * @property {number} IBRate=381 IBRate value
                 * @property {number} RfqTickRespTag=384 RfqTickRespTag value
                 * @property {number} DMM=387 DMM value
                 * @property {number} IssuerFundamentals=388 IssuerFundamentals value
                 * @property {number} IBWarrantImpVolCompeteTick=391 IBWarrantImpVolCompeteTick value
                 * @property {number} IndexCapabilities=405 IndexCapabilities value
                 * @property {number} FuturesMargins=407 FuturesMargins value
                 * @property {number} rthistvol=411 rthistvol value
                 * @property {number} MonitorTickTag=439 MonitorTickTag value
                 * @property {number} RTCLOSE=459 RTCLOSE value
                 * @property {number} BondFactorMultiplier=460 BondFactorMultiplier value
                 * @property {number} FeeandRebateRate=499 FeeandRebateRate value
                 * @property {number} midptiv=506 midptiv value
                 * @property {number} hvolrt10perUnderlying=511 hvolrt10perUnderlying value
                 * @property {number} hvolrt30perUnderlying=512 hvolrt30perUnderlying value
                 * @property {number} hvolrt50perUnderlying=513 hvolrt50perUnderlying value
                 * @property {number} hvolrt75perUnderlying=514 hvolrt75perUnderlying value
                 * @property {number} hvolrt100perUnderlying=515 hvolrt100perUnderlying value
                 * @property {number} hvolrt150perUnderlying=516 hvolrt150perUnderlying value
                 * @property {number} hvolrt200perUnderlying=517 hvolrt200perUnderlying value
                 * @property {number} fzmidptiv=521 fzmidptiv value
                 * @property {number} vsiv=545 vsiv value
                 * @property {number} EtfNavBidAsknavbidask=576 EtfNavBidAsknavbidask value
                 * @property {number} EtfNavLastnavlast=577 EtfNavLastnavlast value
                 * @property {number} EtfNavClosenavclose=578 EtfNavClosenavclose value
                 * @property {number} AverageOpeningVol=584 AverageOpeningVol value
                 * @property {number} AverageClosingVol=585 AverageClosingVol value
                 * @property {number} PlPriceDelayed=587 PlPriceDelayed value
                 * @property {number} FuturesOpenInterest=588 FuturesOpenInterest value
                 * @property {number} EMAN=608 EMAN value
                 * @property {number} EtfNavMischightLow=614 EtfNavMischightLow value
                 * @property {number} CreditmanSlowMarkPrice=619 CreditmanSlowMarkPrice value
                 * @property {number} EtfFrozenNavLastfznavlast=623 EtfFrozenNavLastfznavlast value
                 * @property {number} MonetaryClosePrice=645 428
                 * @property {number} Avgv1Min=658 Avgv1Min value
                 */
                Requests.ETickList = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "TickListNone"] = 0;
                    values[valuesById[100] = "OptionVolume"] = 100;
                    values[valuesById[101] = "OptionOpenInterest"] = 101;
                    values[valuesById[105] = "AverageOptVolume"] = 105;
                    values[valuesById[106] = "Impvolat"] = 106;
                    values[valuesById[107] = "Climpvlt"] = 107;
                    values[valuesById[125] = "Bondanalyticdata"] = 125;
                    values[valuesById[165] = "MiscStats"] = 165;
                    values[valuesById[166] = "CScreen"] = 166;
                    values[valuesById[221] = "CreditmanMarkPrice"] = 221;
                    values[valuesById[225] = "Auction"] = 225;
                    values[valuesById[232] = "PlPrice"] = 232;
                    values[valuesById[233] = "RTVolume"] = 233;
                    values[valuesById[236] = "Inventory"] = 236;
                    values[valuesById[258] = "Fundamentals"] = 258;
                    values[valuesById[291] = "Ivclose"] = 291;
                    values[valuesById[292] = "WideNews"] = 292;
                    values[valuesById[293] = "TradeCount"] = 293;
                    values[valuesById[294] = "TradeRate"] = 294;
                    values[valuesById[295] = "VolumeRate"] = 295;
                    values[valuesById[318] = "LastRTHTrade"] = 318;
                    values[valuesById[370] = "ParticipationMonitor"] = 370;
                    values[valuesById[375] = "RTTrdVolume"] = 375;
                    values[valuesById[377] = "CttTickTag"] = 377;
                    values[valuesById[381] = "IBRate"] = 381;
                    values[valuesById[384] = "RfqTickRespTag"] = 384;
                    values[valuesById[387] = "DMM"] = 387;
                    values[valuesById[388] = "IssuerFundamentals"] = 388;
                    values[valuesById[391] = "IBWarrantImpVolCompeteTick"] = 391;
                    values[valuesById[405] = "IndexCapabilities"] = 405;
                    values[valuesById[407] = "FuturesMargins"] = 407;
                    values[valuesById[411] = "rthistvol"] = 411;
                    values[valuesById[439] = "MonitorTickTag"] = 439;
                    values[valuesById[459] = "RTCLOSE"] = 459;
                    values[valuesById[460] = "BondFactorMultiplier"] = 460;
                    values[valuesById[499] = "FeeandRebateRate"] = 499;
                    values[valuesById[506] = "midptiv"] = 506;
                    values[valuesById[511] = "hvolrt10perUnderlying"] = 511;
                    values[valuesById[512] = "hvolrt30perUnderlying"] = 512;
                    values[valuesById[513] = "hvolrt50perUnderlying"] = 513;
                    values[valuesById[514] = "hvolrt75perUnderlying"] = 514;
                    values[valuesById[515] = "hvolrt100perUnderlying"] = 515;
                    values[valuesById[516] = "hvolrt150perUnderlying"] = 516;
                    values[valuesById[517] = "hvolrt200perUnderlying"] = 517;
                    values[valuesById[521] = "fzmidptiv"] = 521;
                    values[valuesById[545] = "vsiv"] = 545;
                    values[valuesById[576] = "EtfNavBidAsknavbidask"] = 576;
                    values[valuesById[577] = "EtfNavLastnavlast"] = 577;
                    values[valuesById[578] = "EtfNavClosenavclose"] = 578;
                    values[valuesById[584] = "AverageOpeningVol"] = 584;
                    values[valuesById[585] = "AverageClosingVol"] = 585;
                    values[valuesById[587] = "PlPriceDelayed"] = 587;
                    values[valuesById[588] = "FuturesOpenInterest"] = 588;
                    values[valuesById[608] = "EMAN"] = 608;
                    values[valuesById[614] = "EtfNavMischightLow"] = 614;
                    values[valuesById[619] = "CreditmanSlowMarkPrice"] = 619;
                    values[valuesById[623] = "EtfFrozenNavLastfznavlast"] = 623;
                    values[valuesById[645] = "MonetaryClosePrice"] = 645;
                    values[valuesById[658] = "Avgv1Min"] = 658;
                    return values;
                })();

                Requests.RequestHistoricalData = (function() {

                    /**
                     * Properties of a RequestHistoricalData.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestHistoricalData
                     * @property {number|null} [RequestId] RequestHistoricalData RequestId
                     * @property {Jde.Markets.Proto.IContract|null} [Contract] RequestHistoricalData Contract
                     * @property {google.protobuf.ITimestamp|null} [Date] RequestHistoricalData Date
                     * @property {number|null} [Days] RequestHistoricalData Days
                     * @property {Jde.Markets.Proto.Requests.BarSize|null} [BarSize] RequestHistoricalData BarSize
                     * @property {Jde.Markets.Proto.Requests.Display|null} [Display] RequestHistoricalData Display
                     * @property {boolean|null} [UseRth] RequestHistoricalData UseRth
                     * @property {boolean|null} [KeepUpToDate] RequestHistoricalData KeepUpToDate
                     */

                    /**
                     * Constructs a new RequestHistoricalData.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestHistoricalData.
                     * @implements IRequestHistoricalData
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestHistoricalData=} [properties] Properties to set
                     */
                    function RequestHistoricalData(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestHistoricalData RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.RequestId = 0;

                    /**
                     * RequestHistoricalData Contract.
                     * @member {Jde.Markets.Proto.IContract|null|undefined} Contract
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.Contract = null;

                    /**
                     * RequestHistoricalData Date.
                     * @member {google.protobuf.ITimestamp|null|undefined} Date
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.Date = null;

                    /**
                     * RequestHistoricalData Days.
                     * @member {number} Days
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.Days = 0;

                    /**
                     * RequestHistoricalData BarSize.
                     * @member {Jde.Markets.Proto.Requests.BarSize} BarSize
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.BarSize = 0;

                    /**
                     * RequestHistoricalData Display.
                     * @member {Jde.Markets.Proto.Requests.Display} Display
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.Display = 0;

                    /**
                     * RequestHistoricalData UseRth.
                     * @member {boolean} UseRth
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.UseRth = false;

                    /**
                     * RequestHistoricalData KeepUpToDate.
                     * @member {boolean} KeepUpToDate
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     */
                    RequestHistoricalData.prototype.KeepUpToDate = false;

                    /**
                     * Creates a new RequestHistoricalData instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestHistoricalData=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestHistoricalData} RequestHistoricalData instance
                     */
                    RequestHistoricalData.create = function create(properties) {
                        return new RequestHistoricalData(properties);
                    };

                    /**
                     * Encodes the specified RequestHistoricalData message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestHistoricalData.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestHistoricalData} message RequestHistoricalData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestHistoricalData.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            $root.Jde.Markets.Proto.Contract.encode(message.Contract, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            $root.google.protobuf.Timestamp.encode(message.Date, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.Days != null && message.hasOwnProperty("Days"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.Days);
                        if (message.BarSize != null && message.hasOwnProperty("BarSize"))
                            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.BarSize);
                        if (message.Display != null && message.hasOwnProperty("Display"))
                            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Display);
                        if (message.UseRth != null && message.hasOwnProperty("UseRth"))
                            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.UseRth);
                        if (message.KeepUpToDate != null && message.hasOwnProperty("KeepUpToDate"))
                            writer.uint32(/* id 8, wireType 0 =*/64).bool(message.KeepUpToDate);
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestHistoricalData message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestHistoricalData.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestHistoricalData} message RequestHistoricalData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestHistoricalData.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestHistoricalData message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestHistoricalData} RequestHistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestHistoricalData.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestHistoricalData();
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
                                message.Date = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.Days = reader.uint32();
                                break;
                            case 5:
                                message.BarSize = reader.int32();
                                break;
                            case 6:
                                message.Display = reader.int32();
                                break;
                            case 7:
                                message.UseRth = reader.bool();
                                break;
                            case 8:
                                message.KeepUpToDate = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestHistoricalData message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestHistoricalData} RequestHistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestHistoricalData.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestHistoricalData message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestHistoricalData.verify = function verify(message) {
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
                        if (message.Date != null && message.hasOwnProperty("Date")) {
                            let error = $root.google.protobuf.Timestamp.verify(message.Date);
                            if (error)
                                return "Date." + error;
                        }
                        if (message.Days != null && message.hasOwnProperty("Days"))
                            if (!$util.isInteger(message.Days))
                                return "Days: integer expected";
                        if (message.BarSize != null && message.hasOwnProperty("BarSize"))
                            switch (message.BarSize) {
                            default:
                                return "BarSize: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 16:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                                break;
                            }
                        if (message.Display != null && message.hasOwnProperty("Display"))
                            switch (message.Display) {
                            default:
                                return "Display: enum value expected";
                            case 0:
                            case 1:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                                break;
                            }
                        if (message.UseRth != null && message.hasOwnProperty("UseRth"))
                            if (typeof message.UseRth !== "boolean")
                                return "UseRth: boolean expected";
                        if (message.KeepUpToDate != null && message.hasOwnProperty("KeepUpToDate"))
                            if (typeof message.KeepUpToDate !== "boolean")
                                return "KeepUpToDate: boolean expected";
                        return null;
                    };

                    /**
                     * Creates a RequestHistoricalData message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestHistoricalData} RequestHistoricalData
                     */
                    RequestHistoricalData.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestHistoricalData)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestHistoricalData();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.Contract != null) {
                            if (typeof object.Contract !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestHistoricalData.Contract: object expected");
                            message.Contract = $root.Jde.Markets.Proto.Contract.fromObject(object.Contract);
                        }
                        if (object.Date != null) {
                            if (typeof object.Date !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestHistoricalData.Date: object expected");
                            message.Date = $root.google.protobuf.Timestamp.fromObject(object.Date);
                        }
                        if (object.Days != null)
                            message.Days = object.Days >>> 0;
                        switch (object.BarSize) {
                        case "None":
                        case 0:
                            message.BarSize = 0;
                            break;
                        case "Second":
                        case 1:
                            message.BarSize = 1;
                            break;
                        case "Second5":
                        case 2:
                            message.BarSize = 2;
                            break;
                        case "Second15":
                        case 3:
                            message.BarSize = 3;
                            break;
                        case "Second30":
                        case 4:
                            message.BarSize = 4;
                            break;
                        case "Minute":
                        case 5:
                            message.BarSize = 5;
                            break;
                        case "Minute2":
                        case 6:
                            message.BarSize = 6;
                            break;
                        case "Minute3":
                        case 16:
                            message.BarSize = 16;
                            break;
                        case "Minute5":
                        case 7:
                            message.BarSize = 7;
                            break;
                        case "Minute15":
                        case 8:
                            message.BarSize = 8;
                            break;
                        case "Minute30":
                        case 9:
                            message.BarSize = 9;
                            break;
                        case "Hour":
                        case 10:
                            message.BarSize = 10;
                            break;
                        case "Day":
                        case 11:
                            message.BarSize = 11;
                            break;
                        case "Week":
                        case 12:
                            message.BarSize = 12;
                            break;
                        case "Month":
                        case 13:
                            message.BarSize = 13;
                            break;
                        case "Month3":
                        case 14:
                            message.BarSize = 14;
                            break;
                        case "Year":
                        case 15:
                            message.BarSize = 15;
                            break;
                        }
                        switch (object.Display) {
                        case "Trades":
                        case 0:
                            message.Display = 0;
                            break;
                        case "Midpoint":
                        case 1:
                            message.Display = 1;
                            break;
                        case "Bid":
                        case 3:
                            message.Display = 3;
                            break;
                        case "Ask":
                        case 4:
                            message.Display = 4;
                            break;
                        case "BidAsk":
                        case 5:
                            message.Display = 5;
                            break;
                        case "HistoricalVolatility":
                        case 6:
                            message.Display = 6;
                            break;
                        case "OptionImpliedVolatility":
                        case 7:
                            message.Display = 7;
                            break;
                        case "FeeRate":
                        case 8:
                            message.Display = 8;
                            break;
                        case "RebateRate":
                        case 9:
                            message.Display = 9;
                            break;
                        }
                        if (object.UseRth != null)
                            message.UseRth = Boolean(object.UseRth);
                        if (object.KeepUpToDate != null)
                            message.KeepUpToDate = Boolean(object.KeepUpToDate);
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestHistoricalData message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestHistoricalData} message RequestHistoricalData
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestHistoricalData.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.Contract = null;
                            object.Date = null;
                            object.Days = 0;
                            object.BarSize = options.enums === String ? "None" : 0;
                            object.Display = options.enums === String ? "Trades" : 0;
                            object.UseRth = false;
                            object.KeepUpToDate = false;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Contract != null && message.hasOwnProperty("Contract"))
                            object.Contract = $root.Jde.Markets.Proto.Contract.toObject(message.Contract, options);
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            object.Date = $root.google.protobuf.Timestamp.toObject(message.Date, options);
                        if (message.Days != null && message.hasOwnProperty("Days"))
                            object.Days = message.Days;
                        if (message.BarSize != null && message.hasOwnProperty("BarSize"))
                            object.BarSize = options.enums === String ? $root.Jde.Markets.Proto.Requests.BarSize[message.BarSize] : message.BarSize;
                        if (message.Display != null && message.hasOwnProperty("Display"))
                            object.Display = options.enums === String ? $root.Jde.Markets.Proto.Requests.Display[message.Display] : message.Display;
                        if (message.UseRth != null && message.hasOwnProperty("UseRth"))
                            object.UseRth = message.UseRth;
                        if (message.KeepUpToDate != null && message.hasOwnProperty("KeepUpToDate"))
                            object.KeepUpToDate = message.KeepUpToDate;
                        return object;
                    };

                    /**
                     * Converts this RequestHistoricalData to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestHistoricalData
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestHistoricalData.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestHistoricalData;
                })();

                Requests.RequestMrkDataSmart = (function() {

                    /**
                     * Properties of a RequestMrkDataSmart.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestMrkDataSmart
                     * @property {number|null} [RequestId] RequestMrkDataSmart RequestId
                     * @property {number|null} [ContractId] RequestMrkDataSmart ContractId
                     * @property {Array.<Jde.Markets.Proto.Requests.ETickList>|null} [TickList] RequestMrkDataSmart TickList
                     * @property {boolean|null} [Snapshot] RequestMrkDataSmart Snapshot
                     */

                    /**
                     * Constructs a new RequestMrkDataSmart.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestMrkDataSmart.
                     * @implements IRequestMrkDataSmart
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestMrkDataSmart=} [properties] Properties to set
                     */
                    function RequestMrkDataSmart(properties) {
                        this.TickList = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestMrkDataSmart RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @instance
                     */
                    RequestMrkDataSmart.prototype.RequestId = 0;

                    /**
                     * RequestMrkDataSmart ContractId.
                     * @member {number} ContractId
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @instance
                     */
                    RequestMrkDataSmart.prototype.ContractId = 0;

                    /**
                     * RequestMrkDataSmart TickList.
                     * @member {Array.<Jde.Markets.Proto.Requests.ETickList>} TickList
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @instance
                     */
                    RequestMrkDataSmart.prototype.TickList = $util.emptyArray;

                    /**
                     * RequestMrkDataSmart Snapshot.
                     * @member {boolean} Snapshot
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @instance
                     */
                    RequestMrkDataSmart.prototype.Snapshot = false;

                    /**
                     * Creates a new RequestMrkDataSmart instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestMrkDataSmart=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestMrkDataSmart} RequestMrkDataSmart instance
                     */
                    RequestMrkDataSmart.create = function create(properties) {
                        return new RequestMrkDataSmart(properties);
                    };

                    /**
                     * Encodes the specified RequestMrkDataSmart message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestMrkDataSmart.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestMrkDataSmart} message RequestMrkDataSmart message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestMrkDataSmart.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ContractId);
                        if (message.TickList != null && message.TickList.length) {
                            writer.uint32(/* id 3, wireType 2 =*/26).fork();
                            for (let i = 0; i < message.TickList.length; ++i)
                                writer.int32(message.TickList[i]);
                            writer.ldelim();
                        }
                        if (message.Snapshot != null && message.hasOwnProperty("Snapshot"))
                            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.Snapshot);
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestMrkDataSmart message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestMrkDataSmart.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestMrkDataSmart} message RequestMrkDataSmart message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestMrkDataSmart.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestMrkDataSmart message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestMrkDataSmart} RequestMrkDataSmart
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestMrkDataSmart.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.ContractId = reader.int32();
                                break;
                            case 3:
                                if (!(message.TickList && message.TickList.length))
                                    message.TickList = [];
                                if ((tag & 7) === 2) {
                                    let end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.TickList.push(reader.int32());
                                } else
                                    message.TickList.push(reader.int32());
                                break;
                            case 4:
                                message.Snapshot = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestMrkDataSmart message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestMrkDataSmart} RequestMrkDataSmart
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestMrkDataSmart.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestMrkDataSmart message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestMrkDataSmart.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            if (!$util.isInteger(message.ContractId))
                                return "ContractId: integer expected";
                        if (message.TickList != null && message.hasOwnProperty("TickList")) {
                            if (!Array.isArray(message.TickList))
                                return "TickList: array expected";
                            for (let i = 0; i < message.TickList.length; ++i)
                                switch (message.TickList[i]) {
                                default:
                                    return "TickList: enum value[] expected";
                                case 0:
                                case 100:
                                case 101:
                                case 105:
                                case 106:
                                case 107:
                                case 125:
                                case 165:
                                case 166:
                                case 221:
                                case 225:
                                case 232:
                                case 233:
                                case 236:
                                case 258:
                                case 291:
                                case 292:
                                case 293:
                                case 294:
                                case 295:
                                case 318:
                                case 370:
                                case 375:
                                case 377:
                                case 381:
                                case 384:
                                case 387:
                                case 388:
                                case 391:
                                case 405:
                                case 407:
                                case 411:
                                case 439:
                                case 459:
                                case 460:
                                case 499:
                                case 506:
                                case 511:
                                case 512:
                                case 513:
                                case 514:
                                case 515:
                                case 516:
                                case 517:
                                case 521:
                                case 545:
                                case 576:
                                case 577:
                                case 578:
                                case 584:
                                case 585:
                                case 587:
                                case 588:
                                case 608:
                                case 614:
                                case 619:
                                case 623:
                                case 645:
                                case 658:
                                    break;
                                }
                        }
                        if (message.Snapshot != null && message.hasOwnProperty("Snapshot"))
                            if (typeof message.Snapshot !== "boolean")
                                return "Snapshot: boolean expected";
                        return null;
                    };

                    /**
                     * Creates a RequestMrkDataSmart message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestMrkDataSmart} RequestMrkDataSmart
                     */
                    RequestMrkDataSmart.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.ContractId != null)
                            message.ContractId = object.ContractId | 0;
                        if (object.TickList) {
                            if (!Array.isArray(object.TickList))
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestMrkDataSmart.TickList: array expected");
                            message.TickList = [];
                            for (let i = 0; i < object.TickList.length; ++i)
                                switch (object.TickList[i]) {
                                default:
                                case "TickListNone":
                                case 0:
                                    message.TickList[i] = 0;
                                    break;
                                case "OptionVolume":
                                case 100:
                                    message.TickList[i] = 100;
                                    break;
                                case "OptionOpenInterest":
                                case 101:
                                    message.TickList[i] = 101;
                                    break;
                                case "AverageOptVolume":
                                case 105:
                                    message.TickList[i] = 105;
                                    break;
                                case "Impvolat":
                                case 106:
                                    message.TickList[i] = 106;
                                    break;
                                case "Climpvlt":
                                case 107:
                                    message.TickList[i] = 107;
                                    break;
                                case "Bondanalyticdata":
                                case 125:
                                    message.TickList[i] = 125;
                                    break;
                                case "MiscStats":
                                case 165:
                                    message.TickList[i] = 165;
                                    break;
                                case "CScreen":
                                case 166:
                                    message.TickList[i] = 166;
                                    break;
                                case "CreditmanMarkPrice":
                                case 221:
                                    message.TickList[i] = 221;
                                    break;
                                case "Auction":
                                case 225:
                                    message.TickList[i] = 225;
                                    break;
                                case "PlPrice":
                                case 232:
                                    message.TickList[i] = 232;
                                    break;
                                case "RTVolume":
                                case 233:
                                    message.TickList[i] = 233;
                                    break;
                                case "Inventory":
                                case 236:
                                    message.TickList[i] = 236;
                                    break;
                                case "Fundamentals":
                                case 258:
                                    message.TickList[i] = 258;
                                    break;
                                case "Ivclose":
                                case 291:
                                    message.TickList[i] = 291;
                                    break;
                                case "WideNews":
                                case 292:
                                    message.TickList[i] = 292;
                                    break;
                                case "TradeCount":
                                case 293:
                                    message.TickList[i] = 293;
                                    break;
                                case "TradeRate":
                                case 294:
                                    message.TickList[i] = 294;
                                    break;
                                case "VolumeRate":
                                case 295:
                                    message.TickList[i] = 295;
                                    break;
                                case "LastRTHTrade":
                                case 318:
                                    message.TickList[i] = 318;
                                    break;
                                case "ParticipationMonitor":
                                case 370:
                                    message.TickList[i] = 370;
                                    break;
                                case "RTTrdVolume":
                                case 375:
                                    message.TickList[i] = 375;
                                    break;
                                case "CttTickTag":
                                case 377:
                                    message.TickList[i] = 377;
                                    break;
                                case "IBRate":
                                case 381:
                                    message.TickList[i] = 381;
                                    break;
                                case "RfqTickRespTag":
                                case 384:
                                    message.TickList[i] = 384;
                                    break;
                                case "DMM":
                                case 387:
                                    message.TickList[i] = 387;
                                    break;
                                case "IssuerFundamentals":
                                case 388:
                                    message.TickList[i] = 388;
                                    break;
                                case "IBWarrantImpVolCompeteTick":
                                case 391:
                                    message.TickList[i] = 391;
                                    break;
                                case "IndexCapabilities":
                                case 405:
                                    message.TickList[i] = 405;
                                    break;
                                case "FuturesMargins":
                                case 407:
                                    message.TickList[i] = 407;
                                    break;
                                case "rthistvol":
                                case 411:
                                    message.TickList[i] = 411;
                                    break;
                                case "MonitorTickTag":
                                case 439:
                                    message.TickList[i] = 439;
                                    break;
                                case "RTCLOSE":
                                case 459:
                                    message.TickList[i] = 459;
                                    break;
                                case "BondFactorMultiplier":
                                case 460:
                                    message.TickList[i] = 460;
                                    break;
                                case "FeeandRebateRate":
                                case 499:
                                    message.TickList[i] = 499;
                                    break;
                                case "midptiv":
                                case 506:
                                    message.TickList[i] = 506;
                                    break;
                                case "hvolrt10perUnderlying":
                                case 511:
                                    message.TickList[i] = 511;
                                    break;
                                case "hvolrt30perUnderlying":
                                case 512:
                                    message.TickList[i] = 512;
                                    break;
                                case "hvolrt50perUnderlying":
                                case 513:
                                    message.TickList[i] = 513;
                                    break;
                                case "hvolrt75perUnderlying":
                                case 514:
                                    message.TickList[i] = 514;
                                    break;
                                case "hvolrt100perUnderlying":
                                case 515:
                                    message.TickList[i] = 515;
                                    break;
                                case "hvolrt150perUnderlying":
                                case 516:
                                    message.TickList[i] = 516;
                                    break;
                                case "hvolrt200perUnderlying":
                                case 517:
                                    message.TickList[i] = 517;
                                    break;
                                case "fzmidptiv":
                                case 521:
                                    message.TickList[i] = 521;
                                    break;
                                case "vsiv":
                                case 545:
                                    message.TickList[i] = 545;
                                    break;
                                case "EtfNavBidAsknavbidask":
                                case 576:
                                    message.TickList[i] = 576;
                                    break;
                                case "EtfNavLastnavlast":
                                case 577:
                                    message.TickList[i] = 577;
                                    break;
                                case "EtfNavClosenavclose":
                                case 578:
                                    message.TickList[i] = 578;
                                    break;
                                case "AverageOpeningVol":
                                case 584:
                                    message.TickList[i] = 584;
                                    break;
                                case "AverageClosingVol":
                                case 585:
                                    message.TickList[i] = 585;
                                    break;
                                case "PlPriceDelayed":
                                case 587:
                                    message.TickList[i] = 587;
                                    break;
                                case "FuturesOpenInterest":
                                case 588:
                                    message.TickList[i] = 588;
                                    break;
                                case "EMAN":
                                case 608:
                                    message.TickList[i] = 608;
                                    break;
                                case "EtfNavMischightLow":
                                case 614:
                                    message.TickList[i] = 614;
                                    break;
                                case "CreditmanSlowMarkPrice":
                                case 619:
                                    message.TickList[i] = 619;
                                    break;
                                case "EtfFrozenNavLastfznavlast":
                                case 623:
                                    message.TickList[i] = 623;
                                    break;
                                case "MonetaryClosePrice":
                                case 645:
                                    message.TickList[i] = 645;
                                    break;
                                case "Avgv1Min":
                                case 658:
                                    message.TickList[i] = 658;
                                    break;
                                }
                        }
                        if (object.Snapshot != null)
                            message.Snapshot = Boolean(object.Snapshot);
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestMrkDataSmart message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestMrkDataSmart} message RequestMrkDataSmart
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestMrkDataSmart.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.TickList = [];
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.ContractId = 0;
                            object.Snapshot = false;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            object.ContractId = message.ContractId;
                        if (message.TickList && message.TickList.length) {
                            object.TickList = [];
                            for (let j = 0; j < message.TickList.length; ++j)
                                object.TickList[j] = options.enums === String ? $root.Jde.Markets.Proto.Requests.ETickList[message.TickList[j]] : message.TickList[j];
                        }
                        if (message.Snapshot != null && message.hasOwnProperty("Snapshot"))
                            object.Snapshot = message.Snapshot;
                        return object;
                    };

                    /**
                     * Converts this RequestMrkDataSmart to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestMrkDataSmart
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestMrkDataSmart.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestMrkDataSmart;
                })();

                Requests.RequestContractDetails = (function() {

                    /**
                     * Properties of a RequestContractDetails.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestContractDetails
                     * @property {number|null} [RequestId] RequestContractDetails RequestId
                     * @property {Array.<Jde.Markets.Proto.IContract>|null} [Contracts] RequestContractDetails Contracts
                     */

                    /**
                     * Constructs a new RequestContractDetails.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestContractDetails.
                     * @implements IRequestContractDetails
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestContractDetails=} [properties] Properties to set
                     */
                    function RequestContractDetails(properties) {
                        this.Contracts = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestContractDetails RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @instance
                     */
                    RequestContractDetails.prototype.RequestId = 0;

                    /**
                     * RequestContractDetails Contracts.
                     * @member {Array.<Jde.Markets.Proto.IContract>} Contracts
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @instance
                     */
                    RequestContractDetails.prototype.Contracts = $util.emptyArray;

                    /**
                     * Creates a new RequestContractDetails instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestContractDetails=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestContractDetails} RequestContractDetails instance
                     */
                    RequestContractDetails.create = function create(properties) {
                        return new RequestContractDetails(properties);
                    };

                    /**
                     * Encodes the specified RequestContractDetails message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestContractDetails.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestContractDetails} message RequestContractDetails message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestContractDetails.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.Contracts != null && message.Contracts.length)
                            for (let i = 0; i < message.Contracts.length; ++i)
                                $root.Jde.Markets.Proto.Contract.encode(message.Contracts[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestContractDetails message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestContractDetails.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestContractDetails} message RequestContractDetails message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestContractDetails.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestContractDetails message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestContractDetails} RequestContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestContractDetails.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestContractDetails();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                if (!(message.Contracts && message.Contracts.length))
                                    message.Contracts = [];
                                message.Contracts.push($root.Jde.Markets.Proto.Contract.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestContractDetails message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestContractDetails} RequestContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestContractDetails.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestContractDetails message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestContractDetails.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Contracts != null && message.hasOwnProperty("Contracts")) {
                            if (!Array.isArray(message.Contracts))
                                return "Contracts: array expected";
                            for (let i = 0; i < message.Contracts.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Contract.verify(message.Contracts[i]);
                                if (error)
                                    return "Contracts." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a RequestContractDetails message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestContractDetails} RequestContractDetails
                     */
                    RequestContractDetails.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestContractDetails)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestContractDetails();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.Contracts) {
                            if (!Array.isArray(object.Contracts))
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestContractDetails.Contracts: array expected");
                            message.Contracts = [];
                            for (let i = 0; i < object.Contracts.length; ++i) {
                                if (typeof object.Contracts[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Requests.RequestContractDetails.Contracts: object expected");
                                message.Contracts[i] = $root.Jde.Markets.Proto.Contract.fromObject(object.Contracts[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestContractDetails message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestContractDetails} message RequestContractDetails
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestContractDetails.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Contracts = [];
                        if (options.defaults)
                            object.RequestId = 0;
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Contracts && message.Contracts.length) {
                            object.Contracts = [];
                            for (let j = 0; j < message.Contracts.length; ++j)
                                object.Contracts[j] = $root.Jde.Markets.Proto.Contract.toObject(message.Contracts[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this RequestContractDetails to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestContractDetails
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestContractDetails.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestContractDetails;
                })();

                Requests.RequestOptions = (function() {

                    /**
                     * Properties of a RequestOptions.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestOptions
                     * @property {number|null} [RequestId] RequestOptions RequestId
                     * @property {number|null} [ContractId] RequestOptions ContractId
                     * @property {number|null} [IsCall] RequestOptions IsCall
                     * @property {google.protobuf.ITimestamp|null} [Date] RequestOptions Date
                     */

                    /**
                     * Constructs a new RequestOptions.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestOptions.
                     * @implements IRequestOptions
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestOptions=} [properties] Properties to set
                     */
                    function RequestOptions(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestOptions RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @instance
                     */
                    RequestOptions.prototype.RequestId = 0;

                    /**
                     * RequestOptions ContractId.
                     * @member {number} ContractId
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @instance
                     */
                    RequestOptions.prototype.ContractId = 0;

                    /**
                     * RequestOptions IsCall.
                     * @member {number} IsCall
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @instance
                     */
                    RequestOptions.prototype.IsCall = 0;

                    /**
                     * RequestOptions Date.
                     * @member {google.protobuf.ITimestamp|null|undefined} Date
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @instance
                     */
                    RequestOptions.prototype.Date = null;

                    /**
                     * Creates a new RequestOptions instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestOptions=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestOptions} RequestOptions instance
                     */
                    RequestOptions.create = function create(properties) {
                        return new RequestOptions(properties);
                    };

                    /**
                     * Encodes the specified RequestOptions message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestOptions.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestOptions} message RequestOptions message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestOptions.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ContractId);
                        if (message.IsCall != null && message.hasOwnProperty("IsCall"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.IsCall);
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            $root.google.protobuf.Timestamp.encode(message.Date, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestOptions message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestOptions.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestOptions} message RequestOptions message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestOptions.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestOptions message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestOptions} RequestOptions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestOptions.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestOptions();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.ContractId = reader.int32();
                                break;
                            case 3:
                                message.IsCall = reader.int32();
                                break;
                            case 4:
                                message.Date = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestOptions message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestOptions} RequestOptions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestOptions.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestOptions message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestOptions.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            if (!$util.isInteger(message.ContractId))
                                return "ContractId: integer expected";
                        if (message.IsCall != null && message.hasOwnProperty("IsCall"))
                            if (!$util.isInteger(message.IsCall))
                                return "IsCall: integer expected";
                        if (message.Date != null && message.hasOwnProperty("Date")) {
                            let error = $root.google.protobuf.Timestamp.verify(message.Date);
                            if (error)
                                return "Date." + error;
                        }
                        return null;
                    };

                    /**
                     * Creates a RequestOptions message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestOptions} RequestOptions
                     */
                    RequestOptions.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestOptions)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestOptions();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.ContractId != null)
                            message.ContractId = object.ContractId | 0;
                        if (object.IsCall != null)
                            message.IsCall = object.IsCall | 0;
                        if (object.Date != null) {
                            if (typeof object.Date !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestOptions.Date: object expected");
                            message.Date = $root.google.protobuf.Timestamp.fromObject(object.Date);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestOptions message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestOptions} message RequestOptions
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestOptions.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.ContractId = 0;
                            object.IsCall = 0;
                            object.Date = null;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.ContractId != null && message.hasOwnProperty("ContractId"))
                            object.ContractId = message.ContractId;
                        if (message.IsCall != null && message.hasOwnProperty("IsCall"))
                            object.IsCall = message.IsCall;
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            object.Date = $root.google.protobuf.Timestamp.toObject(message.Date, options);
                        return object;
                    };

                    /**
                     * Converts this RequestOptions to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestOptions
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestOptions.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestOptions;
                })();

                Requests.FlexExecutions = (function() {

                    /**
                     * Properties of a FlexExecutions.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IFlexExecutions
                     * @property {number|null} [RequestId] FlexExecutions RequestId
                     * @property {string|null} [AccountNumber] FlexExecutions AccountNumber
                     * @property {number|null} [Date] FlexExecutions Date
                     */

                    /**
                     * Constructs a new FlexExecutions.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a FlexExecutions.
                     * @implements IFlexExecutions
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IFlexExecutions=} [properties] Properties to set
                     */
                    function FlexExecutions(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * FlexExecutions RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @instance
                     */
                    FlexExecutions.prototype.RequestId = 0;

                    /**
                     * FlexExecutions AccountNumber.
                     * @member {string} AccountNumber
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @instance
                     */
                    FlexExecutions.prototype.AccountNumber = "";

                    /**
                     * FlexExecutions Date.
                     * @member {number} Date
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @instance
                     */
                    FlexExecutions.prototype.Date = 0;

                    /**
                     * Creates a new FlexExecutions instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IFlexExecutions=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.FlexExecutions} FlexExecutions instance
                     */
                    FlexExecutions.create = function create(properties) {
                        return new FlexExecutions(properties);
                    };

                    /**
                     * Encodes the specified FlexExecutions message. Does not implicitly {@link Jde.Markets.Proto.Requests.FlexExecutions.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IFlexExecutions} message FlexExecutions message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    FlexExecutions.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RequestId);
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.AccountNumber);
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.Date);
                        return writer;
                    };

                    /**
                     * Encodes the specified FlexExecutions message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.FlexExecutions.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IFlexExecutions} message FlexExecutions message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    FlexExecutions.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a FlexExecutions message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.FlexExecutions} FlexExecutions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    FlexExecutions.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.FlexExecutions();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.int32();
                                break;
                            case 2:
                                message.AccountNumber = reader.string();
                                break;
                            case 3:
                                message.Date = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a FlexExecutions message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.FlexExecutions} FlexExecutions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    FlexExecutions.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a FlexExecutions message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    FlexExecutions.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            if (!$util.isString(message.AccountNumber))
                                return "AccountNumber: string expected";
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            if (!$util.isInteger(message.Date))
                                return "Date: integer expected";
                        return null;
                    };

                    /**
                     * Creates a FlexExecutions message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.FlexExecutions} FlexExecutions
                     */
                    FlexExecutions.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.FlexExecutions)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.FlexExecutions();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId | 0;
                        if (object.AccountNumber != null)
                            message.AccountNumber = String(object.AccountNumber);
                        if (object.Date != null)
                            message.Date = object.Date >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a FlexExecutions message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @static
                     * @param {Jde.Markets.Proto.Requests.FlexExecutions} message FlexExecutions
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    FlexExecutions.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.AccountNumber = "";
                            object.Date = 0;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.AccountNumber != null && message.hasOwnProperty("AccountNumber"))
                            object.AccountNumber = message.AccountNumber;
                        if (message.Date != null && message.hasOwnProperty("Date"))
                            object.Date = message.Date;
                        return object;
                    };

                    /**
                     * Converts this FlexExecutions to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.FlexExecutions
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    FlexExecutions.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return FlexExecutions;
                })();

                Requests.RequestUnion = (function() {

                    /**
                     * Properties of a RequestUnion.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestUnion
                     * @property {Jde.Markets.Proto.Requests.IGenericRequest|null} [GenericRequest] RequestUnion GenericRequest
                     * @property {Jde.Markets.Proto.Requests.IRequestAccountUpdates|null} [AccountUpdates] RequestUnion AccountUpdates
                     * @property {Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti|null} [AccountUpdatesMulti] RequestUnion AccountUpdatesMulti
                     * @property {Jde.Markets.Proto.Requests.IRequestMrkDataSmart|null} [MrkDataSmart] RequestUnion MrkDataSmart
                     * @property {Jde.Markets.Proto.Requests.IRequestContractDetails|null} [ContractDetails] RequestUnion ContractDetails
                     * @property {Jde.Markets.Proto.Requests.IRequestOptions|null} [Options] RequestUnion Options
                     * @property {Jde.Markets.Proto.Requests.IRequestHistoricalData|null} [HistoricalData] RequestUnion HistoricalData
                     * @property {Jde.Markets.Proto.Requests.IFlexExecutions|null} [FlexExecutions] RequestUnion FlexExecutions
                     */

                    /**
                     * Constructs a new RequestUnion.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestUnion.
                     * @implements IRequestUnion
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestUnion=} [properties] Properties to set
                     */
                    function RequestUnion(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestUnion GenericRequest.
                     * @member {Jde.Markets.Proto.Requests.IGenericRequest|null|undefined} GenericRequest
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.GenericRequest = null;

                    /**
                     * RequestUnion AccountUpdates.
                     * @member {Jde.Markets.Proto.Requests.IRequestAccountUpdates|null|undefined} AccountUpdates
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.AccountUpdates = null;

                    /**
                     * RequestUnion AccountUpdatesMulti.
                     * @member {Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti|null|undefined} AccountUpdatesMulti
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.AccountUpdatesMulti = null;

                    /**
                     * RequestUnion MrkDataSmart.
                     * @member {Jde.Markets.Proto.Requests.IRequestMrkDataSmart|null|undefined} MrkDataSmart
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.MrkDataSmart = null;

                    /**
                     * RequestUnion ContractDetails.
                     * @member {Jde.Markets.Proto.Requests.IRequestContractDetails|null|undefined} ContractDetails
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.ContractDetails = null;

                    /**
                     * RequestUnion Options.
                     * @member {Jde.Markets.Proto.Requests.IRequestOptions|null|undefined} Options
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.Options = null;

                    /**
                     * RequestUnion HistoricalData.
                     * @member {Jde.Markets.Proto.Requests.IRequestHistoricalData|null|undefined} HistoricalData
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.HistoricalData = null;

                    /**
                     * RequestUnion FlexExecutions.
                     * @member {Jde.Markets.Proto.Requests.IFlexExecutions|null|undefined} FlexExecutions
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    RequestUnion.prototype.FlexExecutions = null;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * RequestUnion Value.
                     * @member {"GenericRequest"|"AccountUpdates"|"AccountUpdatesMulti"|"MrkDataSmart"|"ContractDetails"|"Options"|"HistoricalData"|"FlexExecutions"|undefined} Value
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     */
                    Object.defineProperty(RequestUnion.prototype, "Value", {
                        get: $util.oneOfGetter($oneOfFields = ["GenericRequest", "AccountUpdates", "AccountUpdatesMulti", "MrkDataSmart", "ContractDetails", "Options", "HistoricalData", "FlexExecutions"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new RequestUnion instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestUnion=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestUnion} RequestUnion instance
                     */
                    RequestUnion.create = function create(properties) {
                        return new RequestUnion(properties);
                    };

                    /**
                     * Encodes the specified RequestUnion message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestUnion.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestUnion} message RequestUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestUnion.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.GenericRequest != null && message.hasOwnProperty("GenericRequest"))
                            $root.Jde.Markets.Proto.Requests.GenericRequest.encode(message.GenericRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.AccountUpdates != null && message.hasOwnProperty("AccountUpdates"))
                            $root.Jde.Markets.Proto.Requests.RequestAccountUpdates.encode(message.AccountUpdates, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.AccountUpdatesMulti != null && message.hasOwnProperty("AccountUpdatesMulti"))
                            $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.encode(message.AccountUpdatesMulti, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.MrkDataSmart != null && message.hasOwnProperty("MrkDataSmart"))
                            $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart.encode(message.MrkDataSmart, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.ContractDetails != null && message.hasOwnProperty("ContractDetails"))
                            $root.Jde.Markets.Proto.Requests.RequestContractDetails.encode(message.ContractDetails, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.Options != null && message.hasOwnProperty("Options"))
                            $root.Jde.Markets.Proto.Requests.RequestOptions.encode(message.Options, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.HistoricalData != null && message.hasOwnProperty("HistoricalData"))
                            $root.Jde.Markets.Proto.Requests.RequestHistoricalData.encode(message.HistoricalData, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                        if (message.FlexExecutions != null && message.hasOwnProperty("FlexExecutions"))
                            $root.Jde.Markets.Proto.Requests.FlexExecutions.encode(message.FlexExecutions, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestUnion message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestUnion.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestUnion} message RequestUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestUnion.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestUnion message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestUnion} RequestUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestUnion.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestUnion();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.GenericRequest = $root.Jde.Markets.Proto.Requests.GenericRequest.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.AccountUpdates = $root.Jde.Markets.Proto.Requests.RequestAccountUpdates.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.AccountUpdatesMulti = $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.MrkDataSmart = $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.ContractDetails = $root.Jde.Markets.Proto.Requests.RequestContractDetails.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.Options = $root.Jde.Markets.Proto.Requests.RequestOptions.decode(reader, reader.uint32());
                                break;
                            case 7:
                                message.HistoricalData = $root.Jde.Markets.Proto.Requests.RequestHistoricalData.decode(reader, reader.uint32());
                                break;
                            case 8:
                                message.FlexExecutions = $root.Jde.Markets.Proto.Requests.FlexExecutions.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestUnion message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestUnion} RequestUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestUnion.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestUnion message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestUnion.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        let properties = {};
                        if (message.GenericRequest != null && message.hasOwnProperty("GenericRequest")) {
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.GenericRequest.verify(message.GenericRequest);
                                if (error)
                                    return "GenericRequest." + error;
                            }
                        }
                        if (message.AccountUpdates != null && message.hasOwnProperty("AccountUpdates")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.RequestAccountUpdates.verify(message.AccountUpdates);
                                if (error)
                                    return "AccountUpdates." + error;
                            }
                        }
                        if (message.AccountUpdatesMulti != null && message.hasOwnProperty("AccountUpdatesMulti")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.verify(message.AccountUpdatesMulti);
                                if (error)
                                    return "AccountUpdatesMulti." + error;
                            }
                        }
                        if (message.MrkDataSmart != null && message.hasOwnProperty("MrkDataSmart")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart.verify(message.MrkDataSmart);
                                if (error)
                                    return "MrkDataSmart." + error;
                            }
                        }
                        if (message.ContractDetails != null && message.hasOwnProperty("ContractDetails")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.RequestContractDetails.verify(message.ContractDetails);
                                if (error)
                                    return "ContractDetails." + error;
                            }
                        }
                        if (message.Options != null && message.hasOwnProperty("Options")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.RequestOptions.verify(message.Options);
                                if (error)
                                    return "Options." + error;
                            }
                        }
                        if (message.HistoricalData != null && message.hasOwnProperty("HistoricalData")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.RequestHistoricalData.verify(message.HistoricalData);
                                if (error)
                                    return "HistoricalData." + error;
                            }
                        }
                        if (message.FlexExecutions != null && message.hasOwnProperty("FlexExecutions")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.Markets.Proto.Requests.FlexExecutions.verify(message.FlexExecutions);
                                if (error)
                                    return "FlexExecutions." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a RequestUnion message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestUnion} RequestUnion
                     */
                    RequestUnion.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestUnion)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestUnion();
                        if (object.GenericRequest != null) {
                            if (typeof object.GenericRequest !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.GenericRequest: object expected");
                            message.GenericRequest = $root.Jde.Markets.Proto.Requests.GenericRequest.fromObject(object.GenericRequest);
                        }
                        if (object.AccountUpdates != null) {
                            if (typeof object.AccountUpdates !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.AccountUpdates: object expected");
                            message.AccountUpdates = $root.Jde.Markets.Proto.Requests.RequestAccountUpdates.fromObject(object.AccountUpdates);
                        }
                        if (object.AccountUpdatesMulti != null) {
                            if (typeof object.AccountUpdatesMulti !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.AccountUpdatesMulti: object expected");
                            message.AccountUpdatesMulti = $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.fromObject(object.AccountUpdatesMulti);
                        }
                        if (object.MrkDataSmart != null) {
                            if (typeof object.MrkDataSmart !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.MrkDataSmart: object expected");
                            message.MrkDataSmart = $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart.fromObject(object.MrkDataSmart);
                        }
                        if (object.ContractDetails != null) {
                            if (typeof object.ContractDetails !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.ContractDetails: object expected");
                            message.ContractDetails = $root.Jde.Markets.Proto.Requests.RequestContractDetails.fromObject(object.ContractDetails);
                        }
                        if (object.Options != null) {
                            if (typeof object.Options !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.Options: object expected");
                            message.Options = $root.Jde.Markets.Proto.Requests.RequestOptions.fromObject(object.Options);
                        }
                        if (object.HistoricalData != null) {
                            if (typeof object.HistoricalData !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.HistoricalData: object expected");
                            message.HistoricalData = $root.Jde.Markets.Proto.Requests.RequestHistoricalData.fromObject(object.HistoricalData);
                        }
                        if (object.FlexExecutions != null) {
                            if (typeof object.FlexExecutions !== "object")
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestUnion.FlexExecutions: object expected");
                            message.FlexExecutions = $root.Jde.Markets.Proto.Requests.FlexExecutions.fromObject(object.FlexExecutions);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestUnion message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestUnion} message RequestUnion
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestUnion.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (message.GenericRequest != null && message.hasOwnProperty("GenericRequest")) {
                            object.GenericRequest = $root.Jde.Markets.Proto.Requests.GenericRequest.toObject(message.GenericRequest, options);
                            if (options.oneofs)
                                object.Value = "GenericRequest";
                        }
                        if (message.AccountUpdates != null && message.hasOwnProperty("AccountUpdates")) {
                            object.AccountUpdates = $root.Jde.Markets.Proto.Requests.RequestAccountUpdates.toObject(message.AccountUpdates, options);
                            if (options.oneofs)
                                object.Value = "AccountUpdates";
                        }
                        if (message.AccountUpdatesMulti != null && message.hasOwnProperty("AccountUpdatesMulti")) {
                            object.AccountUpdatesMulti = $root.Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.toObject(message.AccountUpdatesMulti, options);
                            if (options.oneofs)
                                object.Value = "AccountUpdatesMulti";
                        }
                        if (message.MrkDataSmart != null && message.hasOwnProperty("MrkDataSmart")) {
                            object.MrkDataSmart = $root.Jde.Markets.Proto.Requests.RequestMrkDataSmart.toObject(message.MrkDataSmart, options);
                            if (options.oneofs)
                                object.Value = "MrkDataSmart";
                        }
                        if (message.ContractDetails != null && message.hasOwnProperty("ContractDetails")) {
                            object.ContractDetails = $root.Jde.Markets.Proto.Requests.RequestContractDetails.toObject(message.ContractDetails, options);
                            if (options.oneofs)
                                object.Value = "ContractDetails";
                        }
                        if (message.Options != null && message.hasOwnProperty("Options")) {
                            object.Options = $root.Jde.Markets.Proto.Requests.RequestOptions.toObject(message.Options, options);
                            if (options.oneofs)
                                object.Value = "Options";
                        }
                        if (message.HistoricalData != null && message.hasOwnProperty("HistoricalData")) {
                            object.HistoricalData = $root.Jde.Markets.Proto.Requests.RequestHistoricalData.toObject(message.HistoricalData, options);
                            if (options.oneofs)
                                object.Value = "HistoricalData";
                        }
                        if (message.FlexExecutions != null && message.hasOwnProperty("FlexExecutions")) {
                            object.FlexExecutions = $root.Jde.Markets.Proto.Requests.FlexExecutions.toObject(message.FlexExecutions, options);
                            if (options.oneofs)
                                object.Value = "FlexExecutions";
                        }
                        return object;
                    };

                    /**
                     * Converts this RequestUnion to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestUnion
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestUnion.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestUnion;
                })();

                Requests.RequestTransmission = (function() {

                    /**
                     * Properties of a RequestTransmission.
                     * @memberof Jde.Markets.Proto.Requests
                     * @interface IRequestTransmission
                     * @property {Array.<Jde.Markets.Proto.Requests.IRequestUnion>|null} [Messages] RequestTransmission Messages
                     */

                    /**
                     * Constructs a new RequestTransmission.
                     * @memberof Jde.Markets.Proto.Requests
                     * @classdesc Represents a RequestTransmission.
                     * @implements IRequestTransmission
                     * @constructor
                     * @param {Jde.Markets.Proto.Requests.IRequestTransmission=} [properties] Properties to set
                     */
                    function RequestTransmission(properties) {
                        this.Messages = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestTransmission Messages.
                     * @member {Array.<Jde.Markets.Proto.Requests.IRequestUnion>} Messages
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @instance
                     */
                    RequestTransmission.prototype.Messages = $util.emptyArray;

                    /**
                     * Creates a new RequestTransmission instance using the specified properties.
                     * @function create
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestTransmission=} [properties] Properties to set
                     * @returns {Jde.Markets.Proto.Requests.RequestTransmission} RequestTransmission instance
                     */
                    RequestTransmission.create = function create(properties) {
                        return new RequestTransmission(properties);
                    };

                    /**
                     * Encodes the specified RequestTransmission message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestTransmission.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestTransmission} message RequestTransmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestTransmission.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Messages != null && message.Messages.length)
                            for (let i = 0; i < message.Messages.length; ++i)
                                $root.Jde.Markets.Proto.Requests.RequestUnion.encode(message.Messages[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestTransmission message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestTransmission.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {Jde.Markets.Proto.Requests.IRequestTransmission} message RequestTransmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestTransmission.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestTransmission message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.Markets.Proto.Requests.RequestTransmission} RequestTransmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestTransmission.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Requests.RequestTransmission();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 10:
                                if (!(message.Messages && message.Messages.length))
                                    message.Messages = [];
                                message.Messages.push($root.Jde.Markets.Proto.Requests.RequestUnion.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestTransmission message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.Markets.Proto.Requests.RequestTransmission} RequestTransmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestTransmission.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestTransmission message.
                     * @function verify
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestTransmission.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Messages != null && message.hasOwnProperty("Messages")) {
                            if (!Array.isArray(message.Messages))
                                return "Messages: array expected";
                            for (let i = 0; i < message.Messages.length; ++i) {
                                let error = $root.Jde.Markets.Proto.Requests.RequestUnion.verify(message.Messages[i]);
                                if (error)
                                    return "Messages." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a RequestTransmission message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.Markets.Proto.Requests.RequestTransmission} RequestTransmission
                     */
                    RequestTransmission.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.Markets.Proto.Requests.RequestTransmission)
                            return object;
                        let message = new $root.Jde.Markets.Proto.Requests.RequestTransmission();
                        if (object.Messages) {
                            if (!Array.isArray(object.Messages))
                                throw TypeError(".Jde.Markets.Proto.Requests.RequestTransmission.Messages: array expected");
                            message.Messages = [];
                            for (let i = 0; i < object.Messages.length; ++i) {
                                if (typeof object.Messages[i] !== "object")
                                    throw TypeError(".Jde.Markets.Proto.Requests.RequestTransmission.Messages: object expected");
                                message.Messages[i] = $root.Jde.Markets.Proto.Requests.RequestUnion.fromObject(object.Messages[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestTransmission message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @static
                     * @param {Jde.Markets.Proto.Requests.RequestTransmission} message RequestTransmission
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestTransmission.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Messages = [];
                        if (message.Messages && message.Messages.length) {
                            object.Messages = [];
                            for (let j = 0; j < message.Messages.length; ++j)
                                object.Messages[j] = $root.Jde.Markets.Proto.Requests.RequestUnion.toObject(message.Messages[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this RequestTransmission to JSON.
                     * @function toJSON
                     * @memberof Jde.Markets.Proto.Requests.RequestTransmission
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestTransmission.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestTransmission;
                })();

                /**
                 * Display enum.
                 * @name Jde.Markets.Proto.Requests.Display
                 * @enum {string}
                 * @property {number} Trades=0 Trades value
                 * @property {number} Midpoint=1 Midpoint value
                 * @property {number} Bid=3 Bid value
                 * @property {number} Ask=4 Ask value
                 * @property {number} BidAsk=5 BidAsk value
                 * @property {number} HistoricalVolatility=6 HistoricalVolatility value
                 * @property {number} OptionImpliedVolatility=7 OptionImpliedVolatility value
                 * @property {number} FeeRate=8 FeeRate value
                 * @property {number} RebateRate=9 RebateRate value
                 */
                Requests.Display = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "Trades"] = 0;
                    values[valuesById[1] = "Midpoint"] = 1;
                    values[valuesById[3] = "Bid"] = 3;
                    values[valuesById[4] = "Ask"] = 4;
                    values[valuesById[5] = "BidAsk"] = 5;
                    values[valuesById[6] = "HistoricalVolatility"] = 6;
                    values[valuesById[7] = "OptionImpliedVolatility"] = 7;
                    values[valuesById[8] = "FeeRate"] = 8;
                    values[valuesById[9] = "RebateRate"] = 9;
                    return values;
                })();

                /**
                 * BarSize enum.
                 * @name Jde.Markets.Proto.Requests.BarSize
                 * @enum {string}
                 * @property {number} None=0 None value
                 * @property {number} Second=1 Second value
                 * @property {number} Second5=2 Second5 value
                 * @property {number} Second15=3 Second15 value
                 * @property {number} Second30=4 Second30 value
                 * @property {number} Minute=5 Minute value
                 * @property {number} Minute2=6 Minute2 value
                 * @property {number} Minute3=16 Minute3 value
                 * @property {number} Minute5=7 Minute5 value
                 * @property {number} Minute15=8 Minute15 value
                 * @property {number} Minute30=9 Minute30 value
                 * @property {number} Hour=10 Hour value
                 * @property {number} Day=11 Day value
                 * @property {number} Week=12 Week value
                 * @property {number} Month=13 Month value
                 * @property {number} Month3=14 Month3 value
                 * @property {number} Year=15 Year value
                 */
                Requests.BarSize = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "None"] = 0;
                    values[valuesById[1] = "Second"] = 1;
                    values[valuesById[2] = "Second5"] = 2;
                    values[valuesById[3] = "Second15"] = 3;
                    values[valuesById[4] = "Second30"] = 4;
                    values[valuesById[5] = "Minute"] = 5;
                    values[valuesById[6] = "Minute2"] = 6;
                    values[valuesById[16] = "Minute3"] = 16;
                    values[valuesById[7] = "Minute5"] = 7;
                    values[valuesById[8] = "Minute15"] = 8;
                    values[valuesById[9] = "Minute30"] = 9;
                    values[valuesById[10] = "Hour"] = 10;
                    values[valuesById[11] = "Day"] = 11;
                    values[valuesById[12] = "Week"] = 12;
                    values[valuesById[13] = "Month"] = 13;
                    values[valuesById[14] = "Month3"] = 14;
                    values[valuesById[15] = "Year"] = 15;
                    return values;
                })();

                /**
                 * ERequests enum.
                 * @name Jde.Markets.Proto.Requests.ERequests
                 * @enum {string}
                 * @property {number} Ping=0 Ping value
                 * @property {number} MarketData=1 MarketData value
                 * @property {number} CANCEL_MKT_DATA=2 CANCEL_MKT_DATA value
                 * @property {number} PlaceOrder=3 PlaceOrder value
                 * @property {number} CancelOrder=4 CancelOrder value
                 * @property {number} REQ_OPEN_ORDERS=5 REQ_OPEN_ORDERS value
                 * @property {number} REQ_ACCT_DATA=6 REQ_ACCT_DATA value
                 * @property {number} REQ_EXECUTIONS=7 REQ_EXECUTIONS value
                 * @property {number} RequestIds=8 RequestIds value
                 * @property {number} REQ_CONTRACT_DATA=9 REQ_CONTRACT_DATA value
                 * @property {number} REQ_MKT_DEPTH=10 REQ_MKT_DEPTH value
                 * @property {number} CANCEL_MKT_DEPTH=11 CANCEL_MKT_DEPTH value
                 * @property {number} REQ_NEWS_BULLETINS=12 REQ_NEWS_BULLETINS value
                 * @property {number} CANCEL_NEWS_BULLETINS=13 CANCEL_NEWS_BULLETINS value
                 * @property {number} SET_SERVER_LOGLEVEL=14 SET_SERVER_LOGLEVEL value
                 * @property {number} REQ_AUTO_OPEN_ORDERS=15 REQ_AUTO_OPEN_ORDERS value
                 * @property {number} REQ_ALL_OPEN_ORDERS=16 REQ_ALL_OPEN_ORDERS value
                 * @property {number} ManagedAccounts=17 ManagedAccounts value
                 * @property {number} REQ_FA=18 REQ_FA value
                 * @property {number} REPLACE_FA=19 REPLACE_FA value
                 * @property {number} REQ_HISTORICAL_DATA=20 REQ_HISTORICAL_DATA value
                 * @property {number} EXERCISE_OPTIONS=21 EXERCISE_OPTIONS value
                 * @property {number} REQ_SCANNER_SUBSCRIPTION=22 REQ_SCANNER_SUBSCRIPTION value
                 * @property {number} CANCEL_SCANNER_SUBSCRIPTION=23 CANCEL_SCANNER_SUBSCRIPTION value
                 * @property {number} REQ_SCANNER_PARAMETERS=24 REQ_SCANNER_PARAMETERS value
                 * @property {number} CANCEL_HISTORICAL_DATA=25 CANCEL_HISTORICAL_DATA value
                 * @property {number} CurrentTime=49 CurrentTime value
                 * @property {number} RequestRealTimeBars=50 RequestRealTimeBars value
                 * @property {number} CANCEL_REAL_TIME_BARS=51 CANCEL_REAL_TIME_BARS value
                 * @property {number} REQ_FUNDAMENTAL_DATA=52 REQ_FUNDAMENTAL_DATA value
                 * @property {number} CANCEL_FUNDAMENTAL_DATA=53 CANCEL_FUNDAMENTAL_DATA value
                 * @property {number} REQ_CALC_IMPLIED_VOLAT=54 REQ_CALC_IMPLIED_VOLAT value
                 * @property {number} REQ_CALC_OPTION_PRICE=55 REQ_CALC_OPTION_PRICE value
                 * @property {number} CANCEL_CALC_IMPLIED_VOLAT=56 CANCEL_CALC_IMPLIED_VOLAT value
                 * @property {number} CANCEL_CALC_OPTION_PRICE=57 CANCEL_CALC_OPTION_PRICE value
                 * @property {number} REQ_GLOBAL_CANCEL=58 REQ_GLOBAL_CANCEL value
                 * @property {number} REQ_MARKET_DATA_TYPE=59 REQ_MARKET_DATA_TYPE value
                 * @property {number} Positions=61 Positions value
                 * @property {number} REQ_ACCOUNT_SUMMARY=62 REQ_ACCOUNT_SUMMARY value
                 * @property {number} CANCEL_ACCOUNT_SUMMARY=63 CANCEL_ACCOUNT_SUMMARY value
                 * @property {number} CANCEL_POSITIONS=64 CANCEL_POSITIONS value
                 * @property {number} VERIFY_REQUEST=65 VERIFY_REQUEST value
                 * @property {number} VERIFY_MESSAGE=66 VERIFY_MESSAGE value
                 * @property {number} QUERY_DISPLAY_GROUPS=67 QUERY_DISPLAY_GROUPS value
                 * @property {number} SUBSCRIBE_TO_GROUP_EVENTS=68 SUBSCRIBE_TO_GROUP_EVENTS value
                 * @property {number} UPDATE_DISPLAY_GROUP=69 UPDATE_DISPLAY_GROUP value
                 * @property {number} UNSUBSCRIBE_FROM_GROUP_EVENTS=70 UNSUBSCRIBE_FROM_GROUP_EVENTS value
                 * @property {number} StartApi=71 StartApi value
                 * @property {number} VERIFY_AND_AUTH_REQUEST=72 VERIFY_AND_AUTH_REQUEST value
                 * @property {number} VERIFY_AND_AUTH_MESSAGE=73 VERIFY_AND_AUTH_MESSAGE value
                 * @property {number} REQ_POSITIONS_MULTI=74 REQ_POSITIONS_MULTI value
                 * @property {number} CANCEL_POSITIONS_MULTI=75 CANCEL_POSITIONS_MULTI value
                 * @property {number} RequestAccountUpdatesMulti_=76 RequestAccountUpdatesMulti_ value
                 * @property {number} CANCEL_ACCOUNT_UPDATES_MULTI=77 CANCEL_ACCOUNT_UPDATES_MULTI value
                 * @property {number} REQ_SEC_DEF_OPT_PARAMS=78 REQ_SEC_DEF_OPT_PARAMS value
                 * @property {number} REQ_SOFT_DOLLAR_TIERS=79 REQ_SOFT_DOLLAR_TIERS value
                 * @property {number} REQ_FAMILY_CODES=80 REQ_FAMILY_CODES value
                 * @property {number} REQ_MATCHING_SYMBOLS=81 REQ_MATCHING_SYMBOLS value
                 * @property {number} REQ_MKT_DEPTH_EXCHANGES=82 REQ_MKT_DEPTH_EXCHANGES value
                 * @property {number} REQ_SMART_COMPONENTS=83 REQ_SMART_COMPONENTS value
                 * @property {number} REQ_NEWS_ARTICLE=84 REQ_NEWS_ARTICLE value
                 * @property {number} REQ_NEWS_PROVIDERS=85 REQ_NEWS_PROVIDERS value
                 * @property {number} REQ_HISTORICAL_NEWS=86 REQ_HISTORICAL_NEWS value
                 * @property {number} REQ_HEAD_TIMESTAMP=87 REQ_HEAD_TIMESTAMP value
                 * @property {number} REQ_HISTOGRAM_DATA=88 REQ_HISTOGRAM_DATA value
                 * @property {number} CANCEL_HISTOGRAM_DATA=89 CANCEL_HISTOGRAM_DATA value
                 * @property {number} CANCEL_HEAD_TIMESTAMP=90 CANCEL_HEAD_TIMESTAMP value
                 * @property {number} REQ_MARKET_RULE=91 REQ_MARKET_RULE value
                 * @property {number} REQ_PNL=92 REQ_PNL value
                 * @property {number} CANCEL_PNL=93 CANCEL_PNL value
                 * @property {number} REQ_PNL_SINGLE=94 REQ_PNL_SINGLE value
                 * @property {number} CANCEL_PNL_SINGLE=95 CANCEL_PNL_SINGLE value
                 * @property {number} REQ_HISTORICAL_TICKS=96 REQ_HISTORICAL_TICKS value
                 * @property {number} REQ_TICK_BY_TICK_DATA=97 REQ_TICK_BY_TICK_DATA value
                 * @property {number} CANCEL_TICK_BY_TICK_DATA=98 CANCEL_TICK_BY_TICK_DATA value
                 */
                Requests.ERequests = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "Ping"] = 0;
                    values[valuesById[1] = "MarketData"] = 1;
                    values[valuesById[2] = "CANCEL_MKT_DATA"] = 2;
                    values[valuesById[3] = "PlaceOrder"] = 3;
                    values[valuesById[4] = "CancelOrder"] = 4;
                    values[valuesById[5] = "REQ_OPEN_ORDERS"] = 5;
                    values[valuesById[6] = "REQ_ACCT_DATA"] = 6;
                    values[valuesById[7] = "REQ_EXECUTIONS"] = 7;
                    values[valuesById[8] = "RequestIds"] = 8;
                    values[valuesById[9] = "REQ_CONTRACT_DATA"] = 9;
                    values[valuesById[10] = "REQ_MKT_DEPTH"] = 10;
                    values[valuesById[11] = "CANCEL_MKT_DEPTH"] = 11;
                    values[valuesById[12] = "REQ_NEWS_BULLETINS"] = 12;
                    values[valuesById[13] = "CANCEL_NEWS_BULLETINS"] = 13;
                    values[valuesById[14] = "SET_SERVER_LOGLEVEL"] = 14;
                    values[valuesById[15] = "REQ_AUTO_OPEN_ORDERS"] = 15;
                    values[valuesById[16] = "REQ_ALL_OPEN_ORDERS"] = 16;
                    values[valuesById[17] = "ManagedAccounts"] = 17;
                    values[valuesById[18] = "REQ_FA"] = 18;
                    values[valuesById[19] = "REPLACE_FA"] = 19;
                    values[valuesById[20] = "REQ_HISTORICAL_DATA"] = 20;
                    values[valuesById[21] = "EXERCISE_OPTIONS"] = 21;
                    values[valuesById[22] = "REQ_SCANNER_SUBSCRIPTION"] = 22;
                    values[valuesById[23] = "CANCEL_SCANNER_SUBSCRIPTION"] = 23;
                    values[valuesById[24] = "REQ_SCANNER_PARAMETERS"] = 24;
                    values[valuesById[25] = "CANCEL_HISTORICAL_DATA"] = 25;
                    values[valuesById[49] = "CurrentTime"] = 49;
                    values[valuesById[50] = "RequestRealTimeBars"] = 50;
                    values[valuesById[51] = "CANCEL_REAL_TIME_BARS"] = 51;
                    values[valuesById[52] = "REQ_FUNDAMENTAL_DATA"] = 52;
                    values[valuesById[53] = "CANCEL_FUNDAMENTAL_DATA"] = 53;
                    values[valuesById[54] = "REQ_CALC_IMPLIED_VOLAT"] = 54;
                    values[valuesById[55] = "REQ_CALC_OPTION_PRICE"] = 55;
                    values[valuesById[56] = "CANCEL_CALC_IMPLIED_VOLAT"] = 56;
                    values[valuesById[57] = "CANCEL_CALC_OPTION_PRICE"] = 57;
                    values[valuesById[58] = "REQ_GLOBAL_CANCEL"] = 58;
                    values[valuesById[59] = "REQ_MARKET_DATA_TYPE"] = 59;
                    values[valuesById[61] = "Positions"] = 61;
                    values[valuesById[62] = "REQ_ACCOUNT_SUMMARY"] = 62;
                    values[valuesById[63] = "CANCEL_ACCOUNT_SUMMARY"] = 63;
                    values[valuesById[64] = "CANCEL_POSITIONS"] = 64;
                    values[valuesById[65] = "VERIFY_REQUEST"] = 65;
                    values[valuesById[66] = "VERIFY_MESSAGE"] = 66;
                    values[valuesById[67] = "QUERY_DISPLAY_GROUPS"] = 67;
                    values[valuesById[68] = "SUBSCRIBE_TO_GROUP_EVENTS"] = 68;
                    values[valuesById[69] = "UPDATE_DISPLAY_GROUP"] = 69;
                    values[valuesById[70] = "UNSUBSCRIBE_FROM_GROUP_EVENTS"] = 70;
                    values[valuesById[71] = "StartApi"] = 71;
                    values[valuesById[72] = "VERIFY_AND_AUTH_REQUEST"] = 72;
                    values[valuesById[73] = "VERIFY_AND_AUTH_MESSAGE"] = 73;
                    values[valuesById[74] = "REQ_POSITIONS_MULTI"] = 74;
                    values[valuesById[75] = "CANCEL_POSITIONS_MULTI"] = 75;
                    values[valuesById[76] = "RequestAccountUpdatesMulti_"] = 76;
                    values[valuesById[77] = "CANCEL_ACCOUNT_UPDATES_MULTI"] = 77;
                    values[valuesById[78] = "REQ_SEC_DEF_OPT_PARAMS"] = 78;
                    values[valuesById[79] = "REQ_SOFT_DOLLAR_TIERS"] = 79;
                    values[valuesById[80] = "REQ_FAMILY_CODES"] = 80;
                    values[valuesById[81] = "REQ_MATCHING_SYMBOLS"] = 81;
                    values[valuesById[82] = "REQ_MKT_DEPTH_EXCHANGES"] = 82;
                    values[valuesById[83] = "REQ_SMART_COMPONENTS"] = 83;
                    values[valuesById[84] = "REQ_NEWS_ARTICLE"] = 84;
                    values[valuesById[85] = "REQ_NEWS_PROVIDERS"] = 85;
                    values[valuesById[86] = "REQ_HISTORICAL_NEWS"] = 86;
                    values[valuesById[87] = "REQ_HEAD_TIMESTAMP"] = 87;
                    values[valuesById[88] = "REQ_HISTOGRAM_DATA"] = 88;
                    values[valuesById[89] = "CANCEL_HISTOGRAM_DATA"] = 89;
                    values[valuesById[90] = "CANCEL_HEAD_TIMESTAMP"] = 90;
                    values[valuesById[91] = "REQ_MARKET_RULE"] = 91;
                    values[valuesById[92] = "REQ_PNL"] = 92;
                    values[valuesById[93] = "CANCEL_PNL"] = 93;
                    values[valuesById[94] = "REQ_PNL_SINGLE"] = 94;
                    values[valuesById[95] = "CANCEL_PNL_SINGLE"] = 95;
                    values[valuesById[96] = "REQ_HISTORICAL_TICKS"] = 96;
                    values[valuesById[97] = "REQ_TICK_BY_TICK_DATA"] = 97;
                    values[valuesById[98] = "CANCEL_TICK_BY_TICK_DATA"] = 98;
                    return values;
                })();

                return Requests;
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
