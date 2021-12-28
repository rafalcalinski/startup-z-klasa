//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.31;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.31] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x2f400e=_0x5c7a;(function(_0x4c76ec,_0x4192e4){const _0x5b58bf=_0x5c7a,_0x44f7d5=_0x4c76ec();while(!![]){try{const _0x1f881a=parseInt(_0x5b58bf(0x3b8))/0x1*(parseInt(_0x5b58bf(0x1e3))/0x2)+-parseInt(_0x5b58bf(0x1c4))/0x3+parseInt(_0x5b58bf(0x322))/0x4+parseInt(_0x5b58bf(0x153))/0x5*(-parseInt(_0x5b58bf(0x1c6))/0x6)+parseInt(_0x5b58bf(0x3e0))/0x7+-parseInt(_0x5b58bf(0x39a))/0x8+parseInt(_0x5b58bf(0x19f))/0x9*(parseInt(_0x5b58bf(0x1fa))/0xa);if(_0x1f881a===_0x4192e4)break;else _0x44f7d5['push'](_0x44f7d5['shift']());}catch(_0x1937dc){_0x44f7d5['push'](_0x44f7d5['shift']());}}}(_0x234f,0xd8353));function _0x5c7a(_0x24f316,_0x3264f3){const _0x234feb=_0x234f();return _0x5c7a=function(_0x5c7a7f,_0x2ee11c){_0x5c7a7f=_0x5c7a7f-0x131;let _0x4ef94d=_0x234feb[_0x5c7a7f];return _0x4ef94d;},_0x5c7a(_0x24f316,_0x3264f3);}var label=_0x2f400e(0x19e),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2f400e(0x266)](function(_0x27b6bd){const _0x1160cd=_0x2f400e;return _0x27b6bd['status']&&_0x27b6bd[_0x1160cd(0x3a2)]['includes']('['+label+']');})[0x0];function _0x234f(){const _0x3ff4b9=['Znnww','clamp','obtainExp','processWrapBreak','setMessageWindowXyOffsets','call','CaMOe','outlineWidth','filter','<RIGHT>','JmlGi','itemHeight','match','textSpeed','MaTdw','\x1bITALIC[1]','isTriggered','return\x20\x27','MessageRows','process_VisuMZ_MessageCore_TextMacros','processFsTextCode','textColor','tBRZD','isChoiceVisible','Armors','DefaultOutlineWidth','obtainGold','registerActorNameAutoColorChanges','calcMoveEasing','States','isPressed','GXZQY','update','ALL','TextCodeReplace','terminateMessage','parameters','obtainEscapeParam','preConvertEscapeCharacters','Instant','moveBy','EKUjy','rtl','boxHeight','JWneY','outputWidth','Window_Message_synchronizeNameBox','vKYXR','lastGainedObjectQuantity','inputtingAction','addContinuousShowTextCommands','LJKZk','process_VisuMZ_MessageCore_TextCodes_Action','selectDefault','follower','normalColor','isInputting','contentsBack','stretchDimmerSprite','NameBoxWindowDefaultColor','map\x20actor','Undefined','ChoiceWindowTextAlign','IoGZC','split','processAutoPosition','prepareShowTextCommand','resetTextColor','applyMoveEasing','version','prepareWordWrapEscapeCharacters','Window_NameBox_refresh','refreshDimmerBitmap','fontItalic','TRvKJ','MessageWindowProperties','false','map\x20player','AutoColorBypassList','convertFontSettingsEscapeCharacters','easeOut','event','setFaceImage','\x1bTEXTALIGNMENT[1]','qpOel','ConfigManager_makeData','RIkYC','setChoiceListMaxRows','isArmor','map\x20event','Window_Help_refresh','LineHeight','updateDimensions','message','makeCommandList','preFlushTextState','QxBvC','min','faceName','getChoiceListLineHeight','open','rFVJM','updateMessageCommonEvents','mainFontSize','true','OeMwp','fcViL','messageWordWrap','messageWidth','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','nextEventCode','_spriteset','messageRows','clearFlags','push','setupNumInput','loadPicture','MaxRows','followers','fIKfJ','trim','WIeaH','Window_Options_changeVolume','registerCommand','launchMessageCommonEvent','ParseItemNotetags','choiceRows','_forcedPosition','VvRfr','callOkHandler','iHgrY','messageWindowRect','_wholeMoveDuration','exit','processColorLock','geKlx','isRTL','processCustomWait','toUpperCase','processAutoColorWords','choiceCols','processTextAlignmentX','yJMHn','Window_Base_processEscapeCharacter','choicePositionType','_moveTargetY','Scene_Boot_onDatabaseLoaded','indexOf','_MessageCoreSettings','_moveDuration','EVAL','Match','processNewLine','_textDelay','process_VisuMZ_MessageCore_TextCodes_Replace','ChoiceWindowProperties','shift','SJUJj','isSceneBattle','CVmiD','</LEFT>','index','_messagePositionReset','battle\x20enemy','<BR>','Enemies','xeymr','ParseAddedText','addMessageCommonEvent','Window_Message_processEscapeCharacter','processMessageCoreEscapeActions','updateAutoPosition','processDrawCenteredPicture','\x1bTEXTALIGNMENT[3]','getMessageWindowWidth','contents','TextSpeed','test','MessageWidth','GuqOo','addExtraShowChoices','placeCancelButton','addedWidth','drawTextEx','Window_Message_isTriggered','OffsetY','FontBiggerCap','MsgWindowOffsetX','Window_Base_processAllText','initTextAlignement','CreateAutoColorRegExpListEntries','TextManager_message','WordWrap','clearCommandList','_messageCommonEvents','KzRdz','5411040bmojSp','updateRelativePosition','HelpWindow','type','gainItem','VZllD','resetWordWrap','processPxTextCode','ARRAYFUNC','hvJfp','YQaiK','Weapons','returnPreservedFontSettings','Window_Base_update','synchronizeNameBox','FEHHh','_eventId','_messageOffsetY','substr','_interpreter','outlineColor','adjustShowChoiceDefault','_textMacroFound','CENTERPICTURE','ARRAYNUM','STRUCT','initMessageCore','obtainEscapeString','start','canMove','updateMove','LuwgN','VisuMZ_0_CoreEngine','initialize','setTextAlignment','makeFontBigger','members','isVolumeSymbol','tRkzQ','slice','FUNC','ConvertTextAutoColorRegExpFriendly','_autoSizeCheck','\x1bI[%1]','iconIndex','updateXyOffsets','Name','Window_Options_addGeneralOptions','_autoPosRegExp','dDHNx','sort','defaultColor','ParseWeaponNotetags','_centerMessageWindow','windowPadding','VQOeh','setPositionType','OffsetX','boxWidth','changeTextColor','drawBackPicture','convertBaseEscapeCharacters','Game_System_initialize','ZoDzF','AutoColor','AdjustRect','convertTextAlignmentEscapeCharacters','Game_Map_setupEvents','Window_Base_initialize','processDrawPicture','_index','drawItem','battleTargetName','TGnOd','xcdvm','(((','addGeneralOptions','isColorLocked','resetRect','isCommandEnabled','setWordWrap','command101','replace','statusText','convertNewPageTextStateMacros','setTextDelay','HIAUd','_targets','TEXTALIGNMENT','WTzwA','ceil','mainFontFace','GvOfV','NameBoxWindowOffsetY','HgUya','MsgWindowOffsetY','_textColorStack','</B>','unshift','Window_Base_processNewLine','createTextState','Default',')))','processCharacter','TextMacros','bgCgB','parse','contentsHeight','itemRectWithPadding','surprise','refresh','Actors','quantity','setMessageWindowRows','setupChoices','Skills','AutoColorRegExp','messagePositionReset','zAYqD','postConvertEscapeCharacters','8993792oSLYfz','colSpacing','addedHeight','CreateAutoColorRegExpLists','FJmek','convertShowChoiceEscapeCodes','OniVS','clampPlacementPosition','description','NameBoxWindowOffsetX','eYbhL','currentExt','windowX','Window_NameBox_updatePlacement','messageCoreTextSpeed','escapeStart','_cancelButton','Window_Message_updatePlacement','makeDeepCopy','Window_Message_terminateMessage','changeTextSpeed','tWCmC','Type','remove','ParseClassNotetags','maxFontSizeInLine','updateEvents','battle\x20party','hNcuY','<B>','3vOxkHE','textSizeExWordWrap','processControlCharacter','Window_Options_isVolumeSymbol','EtqRK','right','toLowerCase','getMessageWindowRows','Window_Base_textSizeEx','_dimmerSprite','center','maxChoiceWidth','_scene','iJvDG','outputHeight','getChoiceListTextAlign','updateBackground','setup','constructor','Window_Message_newPage','MessageWindowXyOffsets','updateForcedPlacement','textSizeExTextAlignment','outLineColor','addMessageCoreCommands','WRAPBREAK','Window_Message_clearFlags','fontSize','ChoiceWindowMaxCols','uMOgX','uDXNM','textCodeResult','anchor','QULJc','processActorNameAutoColorChanges','\x5c%1','left','dZmdc','_autoColorActorNames','activate','4385843GPJtdR','FontSmallerCap','createContents','TightWrap','battleActionName','nxzNb','textCodeCheck','pwKZf','hCCcO','RelativePXPY','padding','prototype','FWzRz','_showFast','makeFontSmaller','ParseSkillNotetags','PjUrD','hJatj','Window_Base_processControlCharacter','WFIOk','setWaitMode','applyDatabaseAutoColor','updateAutoSizePosition','choiceLineHeight','updatePlacement','length','AddOption','Rtorw','parseChoiceText','isItem','Window_ChoiceList_updatePlacement','Scene_Options_maxCommands','setSpeakerName','maxLines','bind','QdtaZ','includes','TextJS','TextColor','JSON','imfcL','Classes','Settings','EndPadding','height','<CENTER>','18375WfjnoC','SWITCHES','_moveTargetHeight','convertBackslashCharacters','ITALIC','itemPadding','\x1bBOLD[1]','DISABLE','tJqZv','lineHeight','setupItemChoice','startX','VZuYY','width','_moveEasingType','getLastGainedItemData','mEmDW','setChoiceListMaxColumns','value','Game_Interpreter_setupChoices','FontChangeValue','Game_Map_initialize','setBackground','name','\x1bWrapBreak[0]','Width','WORD_WRAP_PADDING','updateOffsetPosition','_lastGainedItemData','getTextAlignment','AddAutoColor','Game_Party_initialize','newPage','setColorLock','setChoiceListLineHeight','drawBackCenteredPicture','map\x20party','xmiiI','changePaintOpacity','_texts','TextStr','fontBold','prepareShowTextFollowups','processStoredAutoColorChanges','mVVge','_target','floor','currencyUnit','ChoiceWindowLineHeight','WAIT','setupEvents','setLastGainedItemData','xKYBW','<%1>','ARRAYSTR','registerResetRect','<WORDWRAP>','ekgLX','choice','commandName','paintOpacity','</RIGHT>','convertMessageCoreEscapeReplacements','processAllText','jkZdh','MessageTextDelay','_commonEventId','isAutoColorAffected','changeVolume','hvEXt','_autoPositionTarget','efziL','ParseAllNotetags','max','<I>','MessageCore','15397659CXQVjD','_wordWrap','processCommonEvent','innerWidth','vNxxR','\x1bCOLORLOCK[1]','wzhyO','TextCodeActions','qmeou','updateOverlappingY','StretchDimmedBg','addLoadListener','\x1bTEXTALIGNMENT[0]','emerge','choiceTextAlign','ZOejy','ajwYB','actorName','getChoiceListMaxColumns','SWITCH','kWvTg','battle\x20actor','_indent','addContinuousShowChoices','add','convertVariableEscapeCharacters','processFontChangeBold','isWordWrapEnabled','SHOW','Rows','ConvertParams','isBreakShowTextCommands','_relativePosition','sKdQf','actor','list','CreateAutoColorFor','1651953mCQMtI','windowWidth','2406GXoaam','indent','_moveTargetWidth','setMessageWindowWordWrap','helpWordWrap','postFlushTextState','lwnUp','setMessageWindowWidth','adjustShowChoiceCancel','_messageWindow','_autoSizeRegexp','startY','isSceneMap','fontFace','text','InFzV','Window_Base_changeTextColor','ConfigManager_applyData','getMessageWindowXyOffsets','onChoice','updateNameBoxMove','choices','moveTo','ParseArmorNotetags','_macroBypassWordWrap','convertTextMacros','processTextAlignmentChange','_colorLock','round','229318QwzoIG','faceWidth','getPreservedFontSettings','_moveTargetX','zUGYZ','JwkWJ','IELaz','processPyTextCode','</WORDWRAP>','setRelativePosition','onProcessCharacter','item','ENABLE','Window_Options_statusText','KwlpY','QNcNY','resetFontSettings','BIVxr','Game_Party_gainItem','CanyA','\x1bBOLD[0]','maxCols','applyData','10cjDJnR','updateTransform','processFontChangeItalic','partyMemberName','clearActorNameAutoColor','FVAkz','isWeapon','databaseObjectName','tzMVL','Zwohr','</COLORLOCK>','jwFPU','PREVCOLOR','getChoiceListMaxRows','victory','format','drawing','code','ARRAYSTRUCT','Game_Map_updateEvents','\x1bi[%1]%2','addWrapBreakAfterPunctuation','blt','ANY','convertEscapeCharacters','isRunning','COLORLOCK','<LEFT>','ParseEnemyNotetags','calcWindowHeight','General','XQmNM','prepareAutoSizeEscapeCharacters','isBusy','currentCommand','instantTextSpeed','_list','STR','xZhYF','isMessageWindowWordWrap','obtainItem','messageCoreWindowX','_messageOffsetX','maxCommands','exec','isContinuePrepareShowTextCommands','\x1bTEXTALIGNMENT[2]','MessageWindow','processEscapeCharacter','addCommand','textSizeEx','adjustShowChoiceExtension','RUfuY','setChoiceListTextAlign','innerHeight','splice','processAutoSize','levelUp','_textAlignment','join','ParseStateNotetags','_resetRect','convertLockColorsEscapeCharacters','FastForwardKey','<COLORLOCK>','kZbni','convertChoiceMacros','_textDelayCount','easeInOut','isHelpWindowWordWrap','makeData','prepareForcedPositionEscapeCharacters','process_VisuMZ_MessageCore_AutoColor','clear','battleUserName','\x1bC[%1]%2\x1bPREVCOLOR[0]','ReygO','Window_ChoiceList_windowX','resetPositionX','substring','default','_nameBoxWindow','</I>','close','KVxHs','findTargetSprite','Items','textWidth','onDatabaseLoaded','easeIn','SortObjectByKeyLength','map','getConfigValue','SLeGH','flushTextState','uAFzV','convertHardcodedEscapeReplacements','_subject','\x1bITALIC[0]','USrdk'];_0x234f=function(){return _0x3ff4b9;};return _0x234f();}VisuMZ[label][_0x2f400e(0x14f)]=VisuMZ[label][_0x2f400e(0x14f)]||{},VisuMZ[_0x2f400e(0x1bd)]=function(_0x448a21,_0x3a21f9){const _0xe69c8=_0x2f400e;for(const _0x502fad in _0x3a21f9){if(_0xe69c8(0x18c)!==_0xe69c8(0x1e7)){if(_0x502fad[_0xe69c8(0x26a)](/(.*):(.*)/i)){const _0x1dc98d=String(RegExp['$1']),_0x2f3ed7=String(RegExp['$2'])[_0xe69c8(0x2e8)]()[_0xe69c8(0x2d6)]();let _0x3ff79f,_0x5edb34,_0x436249;switch(_0x2f3ed7){case'NUM':_0x3ff79f=_0x3a21f9[_0x502fad]!==''?Number(_0x3a21f9[_0x502fad]):0x0;break;case _0xe69c8(0x33a):_0x5edb34=_0x3a21f9[_0x502fad]!==''?JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad]):[],_0x3ff79f=_0x5edb34[_0xe69c8(0x255)](_0x46a2e0=>Number(_0x46a2e0));break;case _0xe69c8(0x2f4):_0x3ff79f=_0x3a21f9[_0x502fad]!==''?eval(_0x3a21f9[_0x502fad]):null;break;case'ARRAYEVAL':_0x5edb34=_0x3a21f9[_0x502fad]!==''?JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad]):[],_0x3ff79f=_0x5edb34[_0xe69c8(0x255)](_0x11e56c=>eval(_0x11e56c));break;case _0xe69c8(0x14c):_0x3ff79f=_0x3a21f9[_0x502fad]!==''?JSON['parse'](_0x3a21f9[_0x502fad]):'';break;case'ARRAYJSON':_0x5edb34=_0x3a21f9[_0x502fad]!==''?JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad]):[],_0x3ff79f=_0x5edb34['map'](_0x51c5ec=>JSON[_0xe69c8(0x38c)](_0x51c5ec));break;case _0xe69c8(0x34a):_0x3ff79f=_0x3a21f9[_0x502fad]!==''?new Function(JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad])):new Function('return\x200');break;case _0xe69c8(0x32a):_0x5edb34=_0x3a21f9[_0x502fad]!==''?JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad]):[],_0x3ff79f=_0x5edb34[_0xe69c8(0x255)](_0x31e621=>new Function(JSON['parse'](_0x31e621)));break;case _0xe69c8(0x21f):_0x3ff79f=_0x3a21f9[_0x502fad]!==''?String(_0x3a21f9[_0x502fad]):'';break;case _0xe69c8(0x189):_0x5edb34=_0x3a21f9[_0x502fad]!==''?JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad]):[],_0x3ff79f=_0x5edb34[_0xe69c8(0x255)](_0x5a912c=>String(_0x5a912c));break;case _0xe69c8(0x33b):_0x436249=_0x3a21f9[_0x502fad]!==''?JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad]):{},_0x448a21[_0x1dc98d]={},VisuMZ['ConvertParams'](_0x448a21[_0x1dc98d],_0x436249);continue;case _0xe69c8(0x20c):_0x5edb34=_0x3a21f9[_0x502fad]!==''?JSON[_0xe69c8(0x38c)](_0x3a21f9[_0x502fad]):[],_0x3ff79f=_0x5edb34[_0xe69c8(0x255)](_0x29d5f2=>VisuMZ['ConvertParams']({},JSON[_0xe69c8(0x38c)](_0x29d5f2)));break;default:continue;}_0x448a21[_0x1dc98d]=_0x3ff79f;}}else return _0x4e3334=_0x593c9c['replace'](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x320d7c;}return _0x448a21;},(_0x33cfba=>{const _0x1e3454=_0x2f400e,_0x1f2160=_0x33cfba['name'];for(const _0x13f2b1 of dependencies){if(_0x1e3454(0x1f2)!==_0x1e3454(0x1e8)){if(!Imported[_0x13f2b1]){if(_0x1e3454(0x198)!==_0x1e3454(0x3e5)){alert(_0x1e3454(0x2cb)[_0x1e3454(0x209)](_0x1f2160,_0x13f2b1)),SceneManager[_0x1e3454(0x2e3)]();break;}else this['_forcedPosition'][_0x3c9ed5]!==_0x1b26e9&&(this[_0xc36488]=_0x4ce937(this[_0x1e3454(0x2dd)][_0x79e1f4]));}}else{if(!_0x58e8df[_0x1e3454(0x165)](_0x46c7fc))return![];}}const _0x5ca19c=_0x33cfba['description'];if(_0x5ca19c['match'](/\[Version[ ](.*?)\]/i)){const _0x541927=Number(RegExp['$1']);_0x541927!==VisuMZ[label][_0x1e3454(0x2a3)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1e3454(0x209)](_0x1f2160,_0x541927)),SceneManager[_0x1e3454(0x2e3)]());}if(_0x5ca19c[_0x1e3454(0x26a)](/\[Tier[ ](\d+)\]/i)){const _0x418075=Number(RegExp['$1']);_0x418075<tier?_0x1e3454(0x1e9)!=='IELaz'?this[_0x1e3454(0x3de)]=[]:(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1e3454(0x209)](_0x1f2160,_0x418075,tier)),SceneManager[_0x1e3454(0x2e3)]()):'YjBwz'!=='WXEmQ'?tier=Math[_0x1e3454(0x19c)](_0x418075,tier):this[_0x1e3454(0x199)]=_0x1dcb09[_0x1e3454(0x2d4)]()[_0x1e3454(0x294)](_0x3cd8ae-0x2);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1e3454(0x14f)],_0x33cfba[_0x1e3454(0x282)]);})(pluginData),PluginManager[_0x2f400e(0x2d9)](pluginData[_0x2f400e(0x16a)],_0x2f400e(0x2f9),_0x26b8d7=>{const _0x1f0938=_0x2f400e;VisuMZ[_0x1f0938(0x1bd)](_0x26b8d7,_0x26b8d7);const _0x246e74=_0x26b8d7[_0x1f0938(0x2b9)]||$gameSystem[_0x1f0938(0x2c1)]()||0x1,_0x1e6cb1=_0x26b8d7[_0x1f0938(0x2d3)]||$gameSystem[_0x1f0938(0x207)]()||0x1,_0x235240=_0x26b8d7['MaxCols']||$gameSystem[_0x1f0938(0x1b1)]()||0x1,_0x363539=_0x26b8d7['TextAlign'][_0x1f0938(0x3be)]()||_0x1f0938(0x24a);$gameSystem['setChoiceListLineHeight'](_0x246e74),$gameSystem[_0x1f0938(0x2b5)](_0x1e6cb1),$gameSystem['setChoiceListMaxColumns'](_0x235240),$gameSystem[_0x1f0938(0x22f)](_0x363539);}),PluginManager[_0x2f400e(0x2d9)](pluginData['name'],_0x2f400e(0x2a9),_0x5f3910=>{const _0x1c6780=_0x2f400e;VisuMZ[_0x1c6780(0x1bd)](_0x5f3910,_0x5f3910);const _0x5c04d4=_0x5f3910[_0x1c6780(0x1bc)]||$gameSystem[_0x1c6780(0x3bf)]()||0x1,_0x3f720e=_0x5f3910[_0x1c6780(0x16c)]||$gameSystem[_0x1c6780(0x30c)]()||0x1;$gameTemp[_0x1c6780(0x357)]=!![];const _0x1deb0d=_0x5f3910[_0x1c6780(0x31e)][_0x1c6780(0x3be)]();$gameSystem[_0x1c6780(0x393)](_0x5c04d4),$gameSystem[_0x1c6780(0x1cd)](_0x3f720e);[_0x1c6780(0x2c6),_0x1c6780(0x2aa)][_0x1c6780(0x149)](_0x1deb0d)&&(_0x1c6780(0x37e)!==_0x1c6780(0x37e)?this[_0x1c6780(0x21e)][_0x220bd9][_0x1c6780(0x282)][0x0][_0x1c6780(0x2d0)](_0x3c0511):$gameSystem['setMessageWindowWordWrap'](eval(_0x1deb0d)));const _0x239312=SceneManager['_scene'][_0x1c6780(0x1cf)];_0x239312&&(_0x239312['resetWordWrap'](),_0x239312['updateDimensions'](),_0x239312[_0x1c6780(0x3e2)]());}),PluginManager[_0x2f400e(0x2d9)](pluginData['name'],_0x2f400e(0x3cc),_0x5c14ad=>{const _0x3dd664=_0x2f400e;VisuMZ[_0x3dd664(0x1bd)](_0x5c14ad,_0x5c14ad),$gameSystem[_0x3dd664(0x262)](_0x5c14ad[_0x3dd664(0x35b)],_0x5c14ad[_0x3dd664(0x317)]);const _0x33ee46=SceneManager[_0x3dd664(0x3c4)][_0x3dd664(0x1cf)];_0x33ee46&&(_0x33ee46[_0x3dd664(0x328)](),_0x33ee46['updateDimensions'](),_0x33ee46[_0x3dd664(0x3e2)]());}),VisuMZ['MessageCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x2f400e(0x3eb)][_0x2f400e(0x252)],Scene_Boot[_0x2f400e(0x3eb)][_0x2f400e(0x252)]=function(){const _0x33b584=_0x2f400e;VisuMZ[_0x33b584(0x19e)][_0x33b584(0x2f0)]['call'](this),this[_0x33b584(0x292)](),this[_0x33b584(0x2f8)](),this[_0x33b584(0x271)](),this[_0x33b584(0x242)]();},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x254)]=function(_0x26028b){const _0xbed51d=_0x2f400e,_0x54a8eb=VisuMZ[_0xbed51d(0x19e)]['Settings'][_0x26028b];_0x54a8eb['sort']((_0x33873c,_0x448e10)=>{const _0x435996=_0xbed51d;if(_0x435996(0x291)===_0x435996(0x291)){if(!_0x33873c||!_0x448e10)return-0x1;return _0x448e10['Match'][_0x435996(0x13e)]-_0x33873c[_0x435996(0x2f5)][_0x435996(0x13e)];}else _0xee0d88[_0x435996(0x328)](),_0x36b58f[_0x435996(0x2ba)](),_0x33485e[_0x435996(0x3e2)]();});},Scene_Boot[_0x2f400e(0x3eb)]['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x98ce19=_0x2f400e;VisuMZ['MessageCore'][_0x98ce19(0x254)](_0x98ce19(0x1a6));for(const _0x1a778f of VisuMZ['MessageCore'][_0x98ce19(0x14f)][_0x98ce19(0x1a6)]){if('KwlpY'===_0x98ce19(0x1f1)){_0x1a778f['Match']=_0x1a778f[_0x98ce19(0x2f5)]['toUpperCase'](),_0x1a778f['textCodeCheck']=new RegExp('\x1b'+_0x1a778f['Match'],'gi'),_0x1a778f[_0x98ce19(0x3d7)]='\x1b'+_0x1a778f['Match'];if(_0x1a778f[_0x98ce19(0x3b0)]==='')_0x1a778f['textCodeResult']+='[0]';}else{if(!this[_0x98ce19(0x199)])return;const _0x1553db=_0x411063[_0x98ce19(0x3c4)];if(!_0x1553db)return;if(!_0x1553db[_0x98ce19(0x2cd)])return;const _0x2915e9=_0x1553db[_0x98ce19(0x2cd)][_0x98ce19(0x24f)](this[_0x98ce19(0x199)]);if(!_0x2915e9)return;let _0x50388f=_0x2915e9['x'];_0x50388f-=this['width']/0x2,_0x50388f-=(_0x2b61b2[_0x98ce19(0x160)]-_0x34557b[_0x98ce19(0x35c)])/0x2;let _0x3851e0=_0x2915e9['y'];_0x3851e0-=this[_0x98ce19(0x151)],_0x3851e0-=(_0x12ad85[_0x98ce19(0x151)]-_0x3eaf39['boxHeight'])/0x2,_0x3851e0-=_0x2915e9[_0x98ce19(0x151)]+0x8;const _0x2006f7=_0x479686[_0x98ce19(0x1d8)]();_0x50388f+=_0x2006f7['x'],_0x3851e0+=_0x2006f7['y'],this['x']=_0x59c0e5[_0x98ce19(0x1e2)](_0x50388f),this['y']=_0x3c5700[_0x98ce19(0x1e2)](_0x3851e0),this[_0x98ce19(0x3a1)](!![],![]),this[_0x98ce19(0x24b)]['updatePlacement']();}}},Scene_Boot['prototype'][_0x2f400e(0x2f8)]=function(){const _0x1da878=_0x2f400e;VisuMZ[_0x1da878(0x19e)]['SortObjectByKeyLength'](_0x1da878(0x280));for(const _0x2ed35c of VisuMZ[_0x1da878(0x19e)][_0x1da878(0x14f)][_0x1da878(0x280)]){_0x2ed35c[_0x1da878(0x3e6)]=new RegExp('\x1b'+_0x2ed35c['Match']+_0x2ed35c['Type'],'gi'),_0x2ed35c[_0x1da878(0x17b)]!==''&&_0x2ed35c[_0x1da878(0x17b)]!==_0x1da878(0x29b)?_0x2ed35c[_0x1da878(0x3d7)]=new Function(_0x1da878(0x26f)+_0x2ed35c['TextStr'][_0x1da878(0x374)](/\\/g,'\x1b')+'\x27'):_0x2ed35c[_0x1da878(0x3d7)]=_0x2ed35c[_0x1da878(0x14a)];}},Scene_Boot[_0x2f400e(0x3eb)][_0x2f400e(0x271)]=function(){const _0xdf69ba=_0x2f400e;for(const _0x2d39bc of VisuMZ['MessageCore'][_0xdf69ba(0x14f)][_0xdf69ba(0x38a)]){if(_0xdf69ba(0x257)!==_0xdf69ba(0x2ec)){_0x2d39bc[_0xdf69ba(0x3e6)]=new RegExp('\x5c['+_0x2d39bc[_0xdf69ba(0x2f5)]+'\x5c]','gi');if(_0x2d39bc['TextStr']!==''&&_0x2d39bc[_0xdf69ba(0x17b)]!==_0xdf69ba(0x29b))_0xdf69ba(0x2b2)===_0xdf69ba(0x1ae)?_0x2f3663=this[_0xdf69ba(0x30d)]['fontSize']:_0x2d39bc[_0xdf69ba(0x3d7)]=new Function(_0xdf69ba(0x26f)+_0x2d39bc['TextStr']['replace'](/\\/g,'\x1b')+'\x27');else{if(_0xdf69ba(0x348)!==_0xdf69ba(0x348)){if(!_0x31d9d6[_0xdf69ba(0x165)](_0x3da151))return![];}else _0x2d39bc[_0xdf69ba(0x3d7)]=_0x2d39bc['TextJS'];}}else return this[_0xdf69ba(0x232)](_0x167600,!![],!![]),this[_0xdf69ba(0x29f)](_0xdf69ba(0x301),_0x22b211(_0x440a4c)||0x0),'';}},Scene_Boot[_0x2f400e(0x3eb)][_0x2f400e(0x242)]=function(){const _0x4d4aed=_0x2f400e,_0x4d512e=VisuMZ[_0x4d4aed(0x19e)][_0x4d4aed(0x14f)]['AutoColor'];if(!VisuMZ[_0x4d4aed(0x19b)]){if(_0x4d4aed(0x32b)==='hvJfp')VisuMZ[_0x4d4aed(0x19e)]['AddAutoColor']($dataClasses,_0x4d512e[_0x4d4aed(0x14e)]),VisuMZ[_0x4d4aed(0x19e)][_0x4d4aed(0x171)]($dataSkills,_0x4d512e[_0x4d4aed(0x395)]),VisuMZ[_0x4d4aed(0x19e)]['AddAutoColor']($dataItems,_0x4d512e[_0x4d4aed(0x250)]),VisuMZ[_0x4d4aed(0x19e)][_0x4d4aed(0x171)]($dataWeapons,_0x4d512e[_0x4d4aed(0x32d)]),VisuMZ['MessageCore']['AddAutoColor']($dataArmors,_0x4d512e[_0x4d4aed(0x276)]),VisuMZ[_0x4d4aed(0x19e)][_0x4d4aed(0x171)]($dataEnemies,_0x4d512e[_0x4d4aed(0x303)]),VisuMZ[_0x4d4aed(0x19e)][_0x4d4aed(0x171)]($dataStates,_0x4d512e[_0x4d4aed(0x27b)]);else{for(_0x164851 of _0x4f6f73[_0x4d4aed(0x19e)][_0x4d4aed(0x396)]){_0xf85916=_0x559a20[_0x4d4aed(0x374)](_0x37bc13[0x0],_0x328f80[0x1]);}return _0x17b723;}}VisuMZ[_0x4d4aed(0x19e)][_0x4d4aed(0x39d)]();},VisuMZ[_0x2f400e(0x19e)]['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x2f400e(0x3b7),_0x2f400e(0x383),_0x2f400e(0x19d),_0x2f400e(0x24c),_0x2f400e(0x215),_0x2f400e(0x2fe),_0x2f400e(0x152),'</CENTER>',_0x2f400e(0x267),_0x2f400e(0x190),_0x2f400e(0x23a),_0x2f400e(0x204),_0x2f400e(0x36d),_0x2f400e(0x388),_0x2f400e(0x18b),_0x2f400e(0x1eb),_0x2f400e(0x302),'<LINE\x20BREAK>','PICTURE',_0x2f400e(0x339),'COMMONEVENT',_0x2f400e(0x184),_0x2f400e(0x1bb),'HIDE',_0x2f400e(0x1ef),_0x2f400e(0x15a),_0x2f400e(0x1b2),_0x2f400e(0x154),_0x2f400e(0x27f),_0x2f400e(0x211)],VisuMZ[_0x2f400e(0x19e)]['AddAutoColor']=function(_0x5dbd4a,_0x2b46eb){const _0x4596bc=_0x2f400e;if(_0x2b46eb<=0x0)return;const _0x3b5f4e=_0x5dbd4a;for(const _0x1b920b of _0x3b5f4e){if(!_0x1b920b)continue;VisuMZ['MessageCore'][_0x4596bc(0x1c3)](_0x1b920b,_0x2b46eb);}},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x39d)]=function(){const _0x2d34fd=_0x2f400e;VisuMZ[_0x2d34fd(0x19e)][_0x2d34fd(0x396)]=[];for(let _0x49deac=0x1;_0x49deac<=0x1f;_0x49deac++){if(_0x2d34fd(0x3af)==='ssljS')_0x34a89e[_0x2d34fd(0x2b0)](_0x13607d[0x0],_0x3425a2[0x1]),_0x90bf7b[_0x2d34fd(0x169)](_0x551296[0x2]),_0x2f7f84['setPositionType'](_0x457c63[0x3]),_0x4174ca['setSpeakerName'](_0x3e0a33[0x4]);else{const _0x52d75e='TextColor%1'[_0x2d34fd(0x209)](_0x49deac),_0x4827c5=VisuMZ[_0x2d34fd(0x19e)]['Settings'][_0x2d34fd(0x362)][_0x52d75e];_0x4827c5[_0x2d34fd(0x354)]((_0x1275f9,_0x10f127)=>{const _0x73c2e1=_0x2d34fd;if(_0x73c2e1(0x22e)===_0x73c2e1(0x32c))_0x40e479['y']+=_0xeede3d[_0x73c2e1(0x1d1)];else{if(!_0x1275f9||!_0x10f127)return-0x1;return _0x10f127[_0x73c2e1(0x13e)]-_0x1275f9[_0x73c2e1(0x13e)];}}),this[_0x2d34fd(0x31c)](_0x4827c5,_0x49deac);}}},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x31c)]=function(_0x416eef,_0x3e652f){const _0x115272=_0x2f400e;for(const _0xb3cff9 of _0x416eef){if(_0xb3cff9['length']<=0x0)continue;if(/^\d+$/[_0x115272(0x30f)](_0xb3cff9))continue;let _0x2442b2=VisuMZ['MessageCore'][_0x115272(0x34b)](_0xb3cff9);if(_0xb3cff9['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x50a862=new RegExp(_0x2442b2,'i');else{if(_0x115272(0x380)!==_0x115272(0x246))var _0x50a862=new RegExp('\x5cb'+_0x2442b2+'\x5cb','g');else var _0x2bb635=new _0x282057('\x5cb'+_0xf0bf7e+'\x5cb','g');}VisuMZ['MessageCore'][_0x115272(0x396)]['push']([_0x50a862,_0x115272(0x245)[_0x115272(0x209)](_0x3e652f,_0xb3cff9)]);}},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x34b)]=function(_0x421b37){const _0x275c4f=_0x2f400e;return _0x421b37=_0x421b37[_0x275c4f(0x374)](/(\W)/gi,(_0x3290d1,_0x266217)=>_0x275c4f(0x3db)[_0x275c4f(0x209)](_0x266217)),_0x421b37;},VisuMZ[_0x2f400e(0x19e)]['ParseClassNotetags']=VisuMZ[_0x2f400e(0x3b2)],VisuMZ[_0x2f400e(0x3b2)]=function(_0x35bf7b){const _0x54d5e4=_0x2f400e;VisuMZ[_0x54d5e4(0x19e)][_0x54d5e4(0x3b2)][_0x54d5e4(0x263)](this,_0x35bf7b);const _0x33d71c=VisuMZ[_0x54d5e4(0x19e)][_0x54d5e4(0x14f)][_0x54d5e4(0x362)];VisuMZ[_0x54d5e4(0x19e)][_0x54d5e4(0x1c3)](_0x35bf7b,_0x33d71c[_0x54d5e4(0x14e)]);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x134)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x2f400e(0x134)]=function(_0x5b9c55){const _0x2433c1=_0x2f400e;VisuMZ['MessageCore'][_0x2433c1(0x134)]['call'](this,_0x5b9c55);const _0x2d8ef1=VisuMZ[_0x2433c1(0x19e)][_0x2433c1(0x14f)][_0x2433c1(0x362)];VisuMZ[_0x2433c1(0x19e)][_0x2433c1(0x1c3)](_0x5b9c55,_0x2d8ef1[_0x2433c1(0x395)]);},0x7,VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x2db)]=VisuMZ[_0x2f400e(0x2db)],VisuMZ[_0x2f400e(0x2db)]=function(_0x2712e0){const _0x3d7b83=_0x2f400e;VisuMZ[_0x3d7b83(0x19e)][_0x3d7b83(0x2db)][_0x3d7b83(0x263)](this,_0x2712e0);const _0x40b90e=VisuMZ[_0x3d7b83(0x19e)]['Settings']['AutoColor'];VisuMZ['MessageCore'][_0x3d7b83(0x1c3)](_0x2712e0,_0x40b90e[_0x3d7b83(0x250)]);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x356)]=VisuMZ[_0x2f400e(0x356)],VisuMZ[_0x2f400e(0x356)]=function(_0x4c4fc9){const _0x3f04f2=_0x2f400e;VisuMZ[_0x3f04f2(0x19e)][_0x3f04f2(0x356)][_0x3f04f2(0x263)](this,_0x4c4fc9);const _0x1c5350=VisuMZ['MessageCore']['Settings'][_0x3f04f2(0x362)];VisuMZ[_0x3f04f2(0x19e)][_0x3f04f2(0x1c3)](_0x4c4fc9,_0x1c5350[_0x3f04f2(0x32d)]);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x1dd)]=VisuMZ[_0x2f400e(0x1dd)],VisuMZ[_0x2f400e(0x1dd)]=function(_0x4a1ea4){const _0x48b5c5=_0x2f400e;VisuMZ[_0x48b5c5(0x19e)][_0x48b5c5(0x1dd)][_0x48b5c5(0x263)](this,_0x4a1ea4);const _0x438713=VisuMZ[_0x48b5c5(0x19e)][_0x48b5c5(0x14f)]['AutoColor'];VisuMZ[_0x48b5c5(0x19e)][_0x48b5c5(0x1c3)](_0x4a1ea4,_0x438713[_0x48b5c5(0x276)]);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x216)]=VisuMZ[_0x2f400e(0x216)],VisuMZ['ParseEnemyNotetags']=function(_0x1a88e8){const _0x436b12=_0x2f400e;VisuMZ[_0x436b12(0x19e)][_0x436b12(0x216)][_0x436b12(0x263)](this,_0x1a88e8);const _0x2da972=VisuMZ['MessageCore'][_0x436b12(0x14f)][_0x436b12(0x362)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x1a88e8,_0x2da972['Enemies']);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x236)]=VisuMZ[_0x2f400e(0x236)],VisuMZ[_0x2f400e(0x236)]=function(_0x23088c){const _0x4efb9c=_0x2f400e;VisuMZ['MessageCore']['ParseStateNotetags'][_0x4efb9c(0x263)](this,_0x23088c);const _0x30b6d4=VisuMZ[_0x4efb9c(0x19e)][_0x4efb9c(0x14f)][_0x4efb9c(0x362)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x23088c,_0x30b6d4['States']);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x1c3)]=function(_0x46351d,_0x405a2c){const _0x4dc8d9=_0x2f400e;if(_0x405a2c<=0x0)return;const _0x563c27=VisuMZ['MessageCore']['Settings'][_0x4dc8d9(0x362)][_0x4dc8d9(0x14b)+_0x405a2c];let _0x124c8c=_0x46351d[_0x4dc8d9(0x16a)]['trim']();if(/^\d+$/[_0x4dc8d9(0x30f)](_0x124c8c))return;if(VisuMZ[_0x4dc8d9(0x19e)][_0x4dc8d9(0x2ac)][_0x4dc8d9(0x149)](_0x124c8c[_0x4dc8d9(0x2e8)]()))return;_0x124c8c=_0x124c8c[_0x4dc8d9(0x374)](/\\I\[(\d+)\]/gi,''),_0x124c8c=_0x124c8c[_0x4dc8d9(0x374)](/\x1bI\[(\d+)\]/gi,'');if(_0x124c8c[_0x4dc8d9(0x13e)]<=0x0)return;if(_0x124c8c[_0x4dc8d9(0x26a)](/-----/i))return;_0x563c27[_0x4dc8d9(0x2d0)](_0x124c8c);},SceneManager['isSceneBattle']=function(){const _0x4e52e0=_0x2f400e;return this[_0x4e52e0(0x3c4)]&&this[_0x4e52e0(0x3c4)][_0x4e52e0(0x3ca)]===Scene_Battle;},SceneManager[_0x2f400e(0x1d2)]=function(){const _0x17cb70=_0x2f400e;return this[_0x17cb70(0x3c4)]&&this[_0x17cb70(0x3c4)][_0x17cb70(0x3ca)]===Scene_Map;},VisuMZ[_0x2f400e(0x19e)]['TextManager_message']=TextManager[_0x2f400e(0x2bb)],TextManager[_0x2f400e(0x2bb)]=function(_0x1604e2){const _0xdd12df=_0x2f400e,_0xdf9218=[_0xdd12df(0x233),_0xdd12df(0x1ac),'preemptive',_0xdd12df(0x38f),_0xdd12df(0x208),'defeat',_0xdd12df(0x3a9),_0xdd12df(0x260),_0xdd12df(0x278),_0xdd12df(0x222)];let _0x510641=VisuMZ[_0xdd12df(0x19e)][_0xdd12df(0x31d)]['call'](this,_0x1604e2);return _0xdf9218['includes'](_0x1604e2)&&(_0xdd12df(0x2be)===_0xdd12df(0x2be)?_0x510641='</WORDWRAP>'+_0x510641:_0x35478e[_0xdd12df(0x306)](_0x540331)),_0x510641;},ConfigManager[_0x2f400e(0x26b)]=VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x14f)][_0x2f400e(0x30e)][_0x2f400e(0x387)],VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x2b3)]=ConfigManager[_0x2f400e(0x240)],ConfigManager['makeData']=function(){const _0x428928=_0x2f400e,_0x3f0dd6=VisuMZ[_0x428928(0x19e)][_0x428928(0x2b3)][_0x428928(0x263)](this);return _0x3f0dd6[_0x428928(0x26b)]=this[_0x428928(0x26b)],_0x3f0dd6;},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x1d7)]=ConfigManager[_0x2f400e(0x1f9)],ConfigManager[_0x2f400e(0x1f9)]=function(_0x1d13eb){const _0x5988ba=_0x2f400e;VisuMZ['MessageCore'][_0x5988ba(0x1d7)][_0x5988ba(0x263)](this,_0x1d13eb),_0x5988ba(0x26b)in _0x1d13eb?_0x5988ba(0x2fd)==='CVmiD'?this[_0x5988ba(0x26b)]=Number(_0x1d13eb[_0x5988ba(0x26b)])[_0x5988ba(0x25f)](0x1,0xb):(this['_interpreter']=new _0x21a262(),this[_0x5988ba(0x335)][_0x5988ba(0x3c9)](this['list'](),this[_0x5988ba(0x332)])):'gyhTm'!==_0x5988ba(0x24e)?this[_0x5988ba(0x26b)]=VisuMZ[_0x5988ba(0x19e)][_0x5988ba(0x14f)]['TextSpeed'][_0x5988ba(0x387)]:(this[_0x5988ba(0x390)](),this[_0x5988ba(0x293)](),this['open'](),this[_0x5988ba(0x3df)]());},TextManager[_0x2f400e(0x3a8)]=VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x14f)]['TextSpeed'][_0x2f400e(0x350)],TextManager['instantTextSpeed']=VisuMZ['MessageCore']['Settings'][_0x2f400e(0x30e)][_0x2f400e(0x285)],VisuMZ['MessageCore']['Game_System_initialize']=Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x343)],Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x343)]=function(){const _0x4114d5=_0x2f400e;VisuMZ['MessageCore']['Game_System_initialize'][_0x4114d5(0x263)](this),this[_0x4114d5(0x33c)]();},Game_System[_0x2f400e(0x3eb)]['initMessageCore']=function(){const _0x359d96=_0x2f400e,_0x216f98=VisuMZ[_0x359d96(0x19e)][_0x359d96(0x14f)]['General'],_0x4e3168=VisuMZ[_0x359d96(0x19e)][_0x359d96(0x14f)][_0x359d96(0x31e)];this[_0x359d96(0x2f2)]={'messageRows':_0x216f98[_0x359d96(0x270)],'messageWidth':_0x216f98[_0x359d96(0x310)],'messageWordWrap':_0x4e3168[_0x359d96(0x229)],'helpWordWrap':_0x4e3168[_0x359d96(0x324)],'choiceLineHeight':_0x216f98[_0x359d96(0x183)],'choiceRows':_0x216f98['ChoiceWindowMaxRows'],'choiceCols':_0x216f98['ChoiceWindowMaxCols'],'choiceTextAlign':_0x216f98[_0x359d96(0x29c)]},this[_0x359d96(0x224)]===undefined&&(this[_0x359d96(0x224)]=_0x216f98['MsgWindowOffsetX'],this[_0x359d96(0x333)]=_0x216f98[_0x359d96(0x381)]);},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x3bf)]=function(){const _0x1b271a=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x1b271a(0x2f2)][_0x1b271a(0x2ce)]===undefined)this['initMessageCore']();return this[_0x1b271a(0x2f2)]['messageRows'];},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x393)]=function(_0x4530b9){const _0x27eb7e=_0x2f400e;if(this[_0x27eb7e(0x2f2)]===undefined)this[_0x27eb7e(0x33c)]();if(this[_0x27eb7e(0x2f2)][_0x27eb7e(0x2ce)]===undefined)this[_0x27eb7e(0x33c)]();this['_MessageCoreSettings']['messageRows']=_0x4530b9||0x1;},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x30c)]=function(){const _0xa23d7c=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this[_0xa23d7c(0x33c)]();if(this['_MessageCoreSettings'][_0xa23d7c(0x2ca)]===undefined)this[_0xa23d7c(0x33c)]();return this['_MessageCoreSettings'][_0xa23d7c(0x2ca)];},Game_System[_0x2f400e(0x3eb)]['setMessageWindowWidth']=function(_0x3eb5b9){const _0x3333e8=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this[_0x3333e8(0x33c)]();if(this[_0x3333e8(0x2f2)][_0x3333e8(0x2ca)]===undefined)this[_0x3333e8(0x33c)]();_0x3eb5b9=Math[_0x3333e8(0x37c)](_0x3eb5b9);if(_0x3eb5b9%0x2!==0x0)_0x3eb5b9+=0x1;this['_MessageCoreSettings'][_0x3333e8(0x2ca)]=_0x3eb5b9||0x2;},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x221)]=function(){const _0x5b390e=_0x2f400e;if(this[_0x5b390e(0x2f2)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x5b390e(0x2c9)]===undefined)this[_0x5b390e(0x33c)]();return this[_0x5b390e(0x2f2)][_0x5b390e(0x2c9)];},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x1c9)]=function(_0x5211a){const _0x5ed613=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this[_0x5ed613(0x33c)]();if(this[_0x5ed613(0x2f2)][_0x5ed613(0x2c9)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x5ed613(0x2c9)]=_0x5211a;},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x1d8)]=function(){const _0x4ce147=_0x2f400e;if(this['_messageOffsetX']===undefined){const _0x2725b2=VisuMZ[_0x4ce147(0x19e)][_0x4ce147(0x14f)][_0x4ce147(0x218)];this[_0x4ce147(0x224)]=_0x2725b2['MsgWindowOffsetX'],this['_messageOffsetY']=_0x2725b2['MsgWindowOffsetY'];}return{'x':this['_messageOffsetX']||0x0,'y':this['_messageOffsetY']||0x0};},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x262)]=function(_0x5cd0b6,_0x3b8cc3){const _0x23bb73=_0x2f400e;if(this[_0x23bb73(0x2f2)]===undefined)this[_0x23bb73(0x33c)]();this[_0x23bb73(0x224)]=_0x5cd0b6,this[_0x23bb73(0x333)]=_0x3b8cc3;},Game_System[_0x2f400e(0x3eb)]['isHelpWindowWordWrap']=function(){const _0x27851b=_0x2f400e;if(this[_0x27851b(0x2f2)]===undefined)this['initMessageCore']();if(this[_0x27851b(0x2f2)][_0x27851b(0x1ca)]===undefined)this[_0x27851b(0x33c)]();return this[_0x27851b(0x2f2)][_0x27851b(0x1ca)];},Game_System[_0x2f400e(0x3eb)]['setHelpWindowWordWrap']=function(_0x321548){const _0x497278=_0x2f400e;if(this[_0x497278(0x2f2)]===undefined)this[_0x497278(0x33c)]();if(this[_0x497278(0x2f2)][_0x497278(0x1ca)]===undefined)this[_0x497278(0x33c)]();this[_0x497278(0x2f2)][_0x497278(0x1ca)]=_0x321548;},Game_System[_0x2f400e(0x3eb)]['getChoiceListLineHeight']=function(){const _0x3e26ef=_0x2f400e;if(this[_0x3e26ef(0x2f2)]===undefined)this[_0x3e26ef(0x33c)]();if(this['_MessageCoreSettings']['choiceLineHeight']===undefined)this[_0x3e26ef(0x33c)]();return this[_0x3e26ef(0x2f2)][_0x3e26ef(0x13c)];},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x175)]=function(_0x32c08c){const _0x55dc69=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this[_0x55dc69(0x33c)]();if(this[_0x55dc69(0x2f2)][_0x55dc69(0x13c)]===undefined)this[_0x55dc69(0x33c)]();this[_0x55dc69(0x2f2)][_0x55dc69(0x13c)]=_0x32c08c||0x1;},Game_System[_0x2f400e(0x3eb)]['getChoiceListMaxRows']=function(){const _0x990a02=_0x2f400e;if(this[_0x990a02(0x2f2)]===undefined)this[_0x990a02(0x33c)]();if(this['_MessageCoreSettings'][_0x990a02(0x2dc)]===undefined)this[_0x990a02(0x33c)]();return this[_0x990a02(0x2f2)][_0x990a02(0x2dc)];},Game_System['prototype'][_0x2f400e(0x2b5)]=function(_0x473d1c){const _0x537b0=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this[_0x537b0(0x33c)]();if(this[_0x537b0(0x2f2)]['choiceRows']===undefined)this[_0x537b0(0x33c)]();this[_0x537b0(0x2f2)][_0x537b0(0x2dc)]=_0x473d1c||0x1;},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x1b1)]=function(){const _0xca02c5=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this[_0xca02c5(0x33c)]();if(this[_0xca02c5(0x2f2)][_0xca02c5(0x2ea)]===undefined)this[_0xca02c5(0x33c)]();return this['_MessageCoreSettings'][_0xca02c5(0x2ea)];},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x164)]=function(_0x4e64f1){const _0x4f8ff9=_0x2f400e;if(this['_MessageCoreSettings']===undefined)this[_0x4f8ff9(0x33c)]();if(this[_0x4f8ff9(0x2f2)][_0x4f8ff9(0x2ea)]===undefined)this['initMessageCore']();this[_0x4f8ff9(0x2f2)][_0x4f8ff9(0x2ea)]=_0x4e64f1||0x1;},Game_System['prototype']['getChoiceListTextAlign']=function(){const _0x275fff=_0x2f400e;if(this[_0x275fff(0x2f2)]===undefined)this[_0x275fff(0x33c)]();if(this[_0x275fff(0x2f2)][_0x275fff(0x1ad)]===undefined)this['initMessageCore']();return this[_0x275fff(0x2f2)]['choiceTextAlign'];},Game_System[_0x2f400e(0x3eb)][_0x2f400e(0x22f)]=function(_0x511f1a){const _0x52ec26=_0x2f400e;if(this[_0x52ec26(0x2f2)]===undefined)this[_0x52ec26(0x33c)]();if(this['_MessageCoreSettings'][_0x52ec26(0x1ad)]===undefined)this[_0x52ec26(0x33c)]();this[_0x52ec26(0x2f2)][_0x52ec26(0x1ad)]=_0x511f1a[_0x52ec26(0x3be)]();},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x172)]=Game_Party['prototype']['initialize'],Game_Party[_0x2f400e(0x3eb)]['initialize']=function(){const _0x487a3c=_0x2f400e;VisuMZ['MessageCore'][_0x487a3c(0x172)][_0x487a3c(0x263)](this),this['initMessageCore']();},Game_Party[_0x2f400e(0x3eb)][_0x2f400e(0x33c)]=function(){const _0x261446=_0x2f400e;this[_0x261446(0x16f)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x2f400e(0x3eb)][_0x2f400e(0x162)]=function(){const _0x405043=_0x2f400e;if(this[_0x405043(0x16f)]===undefined)this[_0x405043(0x33c)]();return this[_0x405043(0x16f)];},Game_Party['prototype'][_0x2f400e(0x186)]=function(_0xfc4589,_0x4a5598){const _0x25e8be=_0x2f400e;if(this[_0x25e8be(0x16f)]===undefined)this[_0x25e8be(0x33c)]();if(!_0xfc4589)return;if(DataManager[_0x25e8be(0x142)](_0xfc4589))this['_lastGainedItemData'][_0x25e8be(0x325)]=0x0;else{if(DataManager[_0x25e8be(0x200)](_0xfc4589))this[_0x25e8be(0x16f)][_0x25e8be(0x325)]=0x1;else DataManager[_0x25e8be(0x2b6)](_0xfc4589)&&(this[_0x25e8be(0x16f)][_0x25e8be(0x325)]=0x2);}this['_lastGainedItemData']['id']=_0xfc4589['id'],this[_0x25e8be(0x16f)][_0x25e8be(0x392)]=_0x4a5598;},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x1f5)]=Game_Party[_0x2f400e(0x3eb)]['gainItem'],Game_Party[_0x2f400e(0x3eb)][_0x2f400e(0x326)]=function(_0x1455c8,_0x2656e6,_0xd891d5){const _0x2990d8=_0x2f400e;VisuMZ[_0x2990d8(0x19e)]['Game_Party_gainItem']['call'](this,_0x1455c8,_0x2656e6,_0xd891d5);if(_0x2656e6>0x0){if(_0x2990d8(0x1c0)==='sKdQf')this[_0x2990d8(0x186)](_0x1455c8,_0x2656e6);else{this[_0x2990d8(0x23d)]=this[_0x2990d8(0x2f7)];if(this[_0x2990d8(0x2f7)]<=0x0)this[_0x2990d8(0x132)]=!![];}}},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x168)]=Game_Map[_0x2f400e(0x3eb)][_0x2f400e(0x343)],Game_Map[_0x2f400e(0x3eb)][_0x2f400e(0x343)]=function(){const _0xed9de8=_0x2f400e;VisuMZ[_0xed9de8(0x19e)][_0xed9de8(0x168)][_0xed9de8(0x263)](this),this[_0xed9de8(0x320)]=[];},VisuMZ[_0x2f400e(0x19e)]['Game_Map_setupEvents']=Game_Map[_0x2f400e(0x3eb)][_0x2f400e(0x185)],Game_Map[_0x2f400e(0x3eb)][_0x2f400e(0x185)]=function(){const _0x38e4fa=_0x2f400e;VisuMZ[_0x38e4fa(0x19e)][_0x38e4fa(0x365)][_0x38e4fa(0x263)](this),this[_0x38e4fa(0x320)]=[];},VisuMZ[_0x2f400e(0x19e)]['Game_Map_updateEvents']=Game_Map[_0x2f400e(0x3eb)][_0x2f400e(0x3b4)],Game_Map[_0x2f400e(0x3eb)][_0x2f400e(0x3b4)]=function(){const _0x160aaf=_0x2f400e;VisuMZ[_0x160aaf(0x19e)][_0x160aaf(0x20d)][_0x160aaf(0x263)](this),this['updateMessageCommonEvents']();},Game_Map[_0x2f400e(0x3eb)]['addMessageCommonEvent']=function(_0x2f090a){const _0x5a8b57=_0x2f400e;if(!$dataCommonEvents[_0x2f090a])return;this[_0x5a8b57(0x320)]=this[_0x5a8b57(0x320)]||[];const _0x56df99=this[_0x5a8b57(0x335)]['_eventId'],_0xa5d5a5=new Game_MessageCommonEvent(_0x2f090a,_0x56df99);this[_0x5a8b57(0x320)]['push'](_0xa5d5a5);},Game_Map[_0x2f400e(0x3eb)][_0x2f400e(0x2c4)]=function(){const _0x56ea97=_0x2f400e;this[_0x56ea97(0x320)]=this[_0x56ea97(0x320)]||[];for(const _0x16527b of this[_0x56ea97(0x320)]){!_0x16527b[_0x56ea97(0x335)]?this['_messageCommonEvents'][_0x56ea97(0x3b1)](_0x16527b):_0x16527b['update']();}},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x373)]=function(_0x2e1f02){const _0x18f86d=_0x2f400e;if($gameMessage[_0x18f86d(0x21b)]())return![];return this[_0x18f86d(0x2a0)](_0x2e1f02),this['addContinuousShowTextCommands'](_0x2e1f02),this[_0x18f86d(0x17d)](_0x2e1f02),this[_0x18f86d(0x139)](_0x18f86d(0x2bb)),!![];},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x2a0)]=function(_0x482dd9){const _0x33438f=_0x2f400e;$gameMessage[_0x33438f(0x2b0)](_0x482dd9[0x0],_0x482dd9[0x1]),$gameMessage['setBackground'](_0x482dd9[0x2]),$gameMessage[_0x33438f(0x35a)](_0x482dd9[0x3]),$gameMessage[_0x33438f(0x145)](_0x482dd9[0x4]);},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x290)]=function(_0xc30b70){const _0x590422=_0x2f400e;while(this[_0x590422(0x227)]()){this[_0x590422(0x368)]++;if(this['currentCommand']()[_0x590422(0x20b)]===0x191){let _0x153187=this[_0x590422(0x21c)]()['parameters'][0x0];_0x153187=VisuMZ[_0x590422(0x19e)][_0x590422(0x305)](_0x153187),$gameMessage[_0x590422(0x1b7)](_0x153187);}if(this[_0x590422(0x1be)]()){if(_0x590422(0x3a0)===_0x590422(0x202))_0x5566b5('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x590422(0x209)](_0x105554,_0x39f6c3)),_0x3d157c[_0x590422(0x2e3)]();else break;}}},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x227)]=function(){const _0x46d8ed=_0x2f400e;return this['nextEventCode']()===0x65&&$gameSystem[_0x46d8ed(0x3bf)]()>0x4?!![]:'TOqIf'===_0x46d8ed(0x1a5)?!![]:this['nextEventCode']()===0x191;},VisuMZ['MessageCore'][_0x2f400e(0x305)]=function(_0x89392f){const _0x3b22d2=_0x2f400e;return _0x89392f=_0x89392f[_0x3b22d2(0x374)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x89392f;},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x1be)]=function(){const _0xc68232=_0x2f400e;if(this[_0xc68232(0x21c)]()&&this[_0xc68232(0x21c)]()['parameters'][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage['_texts'][_0xc68232(0x13e)]>=$gameSystem[_0xc68232(0x3bf)]()&&this[_0xc68232(0x2cc)]()!==0x191;},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x17d)]=function(_0x471372){const _0x249c74=_0x2f400e;switch(this[_0x249c74(0x2cc)]()){case 0x66:this['_index']++,this['setupChoices'](this[_0x249c74(0x21c)]()['parameters']);break;case 0x67:this[_0x249c74(0x368)]++,this[_0x249c74(0x2d1)](this[_0x249c74(0x21c)]()[_0x249c74(0x282)]);break;case 0x68:this[_0x249c74(0x368)]++,this[_0x249c74(0x15d)](this[_0x249c74(0x21c)]()['parameters']);break;}},VisuMZ[_0x2f400e(0x19e)]['Game_Interpreter_setupChoices']=Game_Interpreter['prototype'][_0x2f400e(0x394)],Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x394)]=function(_0x4bfbb9){const _0x5cf666=_0x2f400e;_0x4bfbb9=this[_0x5cf666(0x1b6)](),VisuMZ[_0x5cf666(0x19e)]['Game_Interpreter_setupChoices'][_0x5cf666(0x263)](this,_0x4bfbb9);},Game_Interpreter[_0x2f400e(0x3eb)]['addContinuousShowChoices']=function(){const _0xaf2d7=_0x2f400e,_0x50f7b8=this[_0xaf2d7(0x368)],_0x4a54a1=[];let _0x43ef3f=0x0;this[_0xaf2d7(0x368)]++;while(this['_index']<this[_0xaf2d7(0x21e)][_0xaf2d7(0x13e)]){if(_0xaf2d7(0x25d)!==_0xaf2d7(0x220)){if(this[_0xaf2d7(0x21c)]()[_0xaf2d7(0x1c7)]===this[_0xaf2d7(0x1b5)]){if(this[_0xaf2d7(0x21c)]()[_0xaf2d7(0x20b)]===0x194&&this[_0xaf2d7(0x2cc)]()!==0x66)break;else{if(this[_0xaf2d7(0x21c)]()[_0xaf2d7(0x20b)]===0x66)this[_0xaf2d7(0x22d)](_0x43ef3f,this[_0xaf2d7(0x21c)](),_0x50f7b8),this[_0xaf2d7(0x368)]-=0x2;else{if(this['currentCommand']()[_0xaf2d7(0x20b)]===0x192){if(_0xaf2d7(0x2de)==='VvRfr')this[_0xaf2d7(0x21c)]()[_0xaf2d7(0x282)][0x0]=_0x43ef3f,_0x43ef3f++;else{let _0x5750c5=0x60;for(const _0x2940ed of this['_list']){const _0x373110=_0x2940ed[_0xaf2d7(0x16a)],_0x57f5f2=this['textSizeEx'](_0x373110)[_0xaf2d7(0x160)],_0x48cd94=_0x4b1ac8[_0xaf2d7(0x37c)](_0x57f5f2)+this[_0xaf2d7(0x158)]()*0x2;_0x5750c5<_0x48cd94&&(_0x5750c5=_0x48cd94);}return _0x5750c5;}}}}}this[_0xaf2d7(0x368)]++;}else return _0x12bc3d['status']&&_0x289429[_0xaf2d7(0x3a2)][_0xaf2d7(0x149)]('['+_0x21a641+']');}return this[_0xaf2d7(0x368)]=_0x50f7b8,this[_0xaf2d7(0x21c)]()[_0xaf2d7(0x282)];},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x22d)]=function(_0x11b4d6,_0xcf213a,_0x58a04a){const _0x286066=_0x2f400e;this[_0x286066(0x337)](_0x11b4d6,_0xcf213a,_0x58a04a),this[_0x286066(0x1ce)](_0x11b4d6,_0xcf213a,_0x58a04a),this[_0x286066(0x312)](_0xcf213a,_0x58a04a);},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x337)]=function(_0x2b750c,_0x58110c,_0x1a5ccd){const _0x1c8423=_0x2f400e;if(_0x58110c[_0x1c8423(0x282)][0x2]<0x0)return;const _0x4e35ec=_0x58110c[_0x1c8423(0x282)][0x2]+_0x2b750c;this[_0x1c8423(0x21e)][_0x1a5ccd]['parameters'][0x2]=_0x4e35ec;},Game_Interpreter[_0x2f400e(0x3eb)]['adjustShowChoiceCancel']=function(_0x279d77,_0x29b0be,_0x1e5738){const _0x5d5492=_0x2f400e;if(_0x29b0be[_0x5d5492(0x282)][0x1]>=0x0){var _0x34b0c0=_0x29b0be[_0x5d5492(0x282)][0x1]+_0x279d77;this[_0x5d5492(0x21e)][_0x1e5738][_0x5d5492(0x282)][0x1]=_0x34b0c0;}else _0x29b0be['parameters'][0x1]===-0x2&&(this[_0x5d5492(0x21e)][_0x1e5738][_0x5d5492(0x282)][0x1]=_0x29b0be[_0x5d5492(0x282)][0x1]);},Game_Interpreter[_0x2f400e(0x3eb)][_0x2f400e(0x312)]=function(_0x3a4072,_0x3da2dc){const _0x3b7c7a=_0x2f400e;for(const _0x4ba2e6 of _0x3a4072['parameters'][0x0]){this[_0x3b7c7a(0x21e)][_0x3da2dc][_0x3b7c7a(0x282)][0x0]['push'](_0x4ba2e6);}this['_list'][_0x3b7c7a(0x231)](this['_index']-0x1,0x2);};function Game_MessageCommonEvent(){const _0x1a6263=_0x2f400e;this[_0x1a6263(0x343)](...arguments);}Game_MessageCommonEvent[_0x2f400e(0x3eb)][_0x2f400e(0x343)]=function(_0x208edb,_0x204d63){const _0x4d787f=_0x2f400e;this[_0x4d787f(0x195)]=_0x208edb,this[_0x4d787f(0x332)]=_0x204d63||0x0,this[_0x4d787f(0x390)]();},Game_MessageCommonEvent[_0x2f400e(0x3eb)]['event']=function(){const _0x3d862a=_0x2f400e;return $dataCommonEvents[this[_0x3d862a(0x195)]];},Game_MessageCommonEvent[_0x2f400e(0x3eb)][_0x2f400e(0x1c2)]=function(){const _0x309189=_0x2f400e;return this['event']()[_0x309189(0x1c2)];},Game_MessageCommonEvent[_0x2f400e(0x3eb)]['refresh']=function(){const _0x87d22=_0x2f400e;this[_0x87d22(0x335)]=new Game_Interpreter(),this[_0x87d22(0x335)]['setup'](this['list'](),this[_0x87d22(0x332)]);},Game_MessageCommonEvent[_0x2f400e(0x3eb)][_0x2f400e(0x27e)]=function(){const _0x285b94=_0x2f400e;this[_0x285b94(0x335)]&&(_0x285b94(0x2e5)===_0x285b94(0x341)?(_0xa65a3a[_0x285b94(0x19e)][_0x285b94(0x1d7)][_0x285b94(0x263)](this,_0x131e25),_0x285b94(0x26b)in _0xa06b06?this[_0x285b94(0x26b)]=_0x59ce7a(_0x13f7d4[_0x285b94(0x26b)])[_0x285b94(0x25f)](0x1,0xb):this[_0x285b94(0x26b)]=_0x1b3695[_0x285b94(0x19e)][_0x285b94(0x14f)][_0x285b94(0x30e)]['Default']):this[_0x285b94(0x335)][_0x285b94(0x213)]()?this[_0x285b94(0x335)][_0x285b94(0x27e)]():this[_0x285b94(0x243)]());},Game_MessageCommonEvent[_0x2f400e(0x3eb)]['clear']=function(){const _0xb837c0=_0x2f400e;this[_0xb837c0(0x335)]=null;},Scene_Message[_0x2f400e(0x3eb)][_0x2f400e(0x2e1)]=function(){const _0x575991=_0x2f400e,_0x4900f1=Math[_0x575991(0x2bf)](Graphics['width'],$gameSystem[_0x575991(0x30c)]()),_0x467ffc=$gameSystem[_0x575991(0x3bf)](),_0x1d0605=this[_0x575991(0x217)](_0x467ffc,![]),_0x3ffb48=(Graphics[_0x575991(0x35c)]-_0x4900f1)/0x2,_0x45ac11=0x0;return new Rectangle(_0x3ffb48,_0x45ac11,_0x4900f1,_0x1d0605);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x144)]=Scene_Options[_0x2f400e(0x3eb)][_0x2f400e(0x225)],Scene_Options[_0x2f400e(0x3eb)]['maxCommands']=function(){const _0x5327be=_0x2f400e;let _0x1925e7=VisuMZ['MessageCore']['Scene_Options_maxCommands'][_0x5327be(0x263)](this);const _0x2d6833=VisuMZ['MessageCore'][_0x5327be(0x14f)];if(_0x2d6833[_0x5327be(0x30e)]['AddOption']&&_0x2d6833[_0x5327be(0x30e)]['AdjustRect'])_0x1925e7++;return _0x1925e7;},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x366)]=Window_Base['prototype'][_0x2f400e(0x343)],Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x343)]=function(_0x535a18){const _0x47bb83=_0x2f400e;this[_0x47bb83(0x33c)](_0x535a18),VisuMZ[_0x47bb83(0x19e)][_0x47bb83(0x366)][_0x47bb83(0x263)](this,_0x535a18);},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x33c)]=function(_0x57bbee){const _0x40ebef=_0x2f400e;this[_0x40ebef(0x31b)](),this['resetWordWrap'](),this[_0x40ebef(0x18a)](_0x57bbee);},Window_Base[_0x2f400e(0x3eb)]['initTextAlignement']=function(){const _0x5bb4b0=_0x2f400e;this[_0x5bb4b0(0x344)](_0x5bb4b0(0x24a));},Window_Base[_0x2f400e(0x3eb)]['setTextAlignment']=function(_0x1c8657){const _0x48e627=_0x2f400e;this[_0x48e627(0x234)]=_0x1c8657;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x170)]=function(){const _0x3780c4=_0x2f400e;return this[_0x3780c4(0x234)];},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x3c0)]=Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x22c)],Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x22c)]=function(_0x336ecb){const _0x1679e2=_0x2f400e;return this[_0x1679e2(0x328)](),VisuMZ[_0x1679e2(0x19e)][_0x1679e2(0x3c0)]['call'](this,_0x336ecb);},VisuMZ[_0x2f400e(0x19e)]['Window_Base_processAllText']=Window_Base['prototype'][_0x2f400e(0x192)],Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x192)]=function(_0x432ffc){const _0x3fc94d=_0x2f400e;VisuMZ[_0x3fc94d(0x19e)][_0x3fc94d(0x31a)][_0x3fc94d(0x263)](this,_0x432ffc);if(_0x432ffc['drawing'])this[_0x3fc94d(0x344)](_0x3fc94d(0x24a));},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x328)]=function(){const _0x35cbe3=_0x2f400e;this[_0x35cbe3(0x372)](![]);},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x1ba)]=function(){const _0x57b9d6=_0x2f400e;return this[_0x57b9d6(0x1a0)];},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x372)]=function(_0x2bd4e6){const _0x56cf5d=_0x2f400e;return this[_0x56cf5d(0x1a0)]=_0x2bd4e6,'';},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x18a)]=function(_0xad6eab){const _0x4a341b=_0x2f400e;this[_0x4a341b(0x237)]=JsonEx[_0x4a341b(0x3ac)](_0xad6eab);},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x1f3)]=function(){const _0x13e5ff=_0x2f400e;this[_0x13e5ff(0x30d)][_0x13e5ff(0x1d3)]=$gameSystem[_0x13e5ff(0x37d)](),this['contents']['fontSize']=$gameSystem[_0x13e5ff(0x2c5)](),this['contents'][_0x13e5ff(0x17c)]=![],this['contents']['fontItalic']=![],this['resetTextColor']();},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x2a1)]=function(){const _0x50487e=_0x2f400e;this[_0x50487e(0x35d)](ColorManager['normalColor']()),this['changeOutlineColor'](ColorManager[_0x50487e(0x336)]());const _0x5d6fa8=VisuMZ[_0x50487e(0x19e)][_0x50487e(0x14f)][_0x50487e(0x218)];_0x5d6fa8['DefaultOutlineWidth']===undefined&&(_0x5d6fa8[_0x50487e(0x277)]=0x3),this[_0x50487e(0x30d)]['outlineWidth']=_0x5d6fa8[_0x50487e(0x277)],this[_0x50487e(0x174)](![]);},Window_Base[_0x2f400e(0x3eb)]['setColorLock']=function(_0x5cfdac){this['_colorLock']=_0x5cfdac;},Window_Base['prototype'][_0x2f400e(0x36f)]=function(){const _0xc24e15=_0x2f400e;return this[_0xc24e15(0x1e1)];},Window_Base[_0x2f400e(0x3eb)]['isAutoColorAffected']=function(){return![];},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x1e5)]=function(){const _0x669aa9=_0x2f400e,_0xc6c92a=[_0x669aa9(0x1d3),_0x669aa9(0x3d3),_0x669aa9(0x17c),_0x669aa9(0x2a7),_0x669aa9(0x273),_0x669aa9(0x3cf),_0x669aa9(0x265),'paintOpacity'];let _0x321abb={};for(const _0x490b1e of _0xc6c92a){_0x321abb[_0x490b1e]=this['contents'][_0x490b1e];}return _0x321abb;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x32e)]=function(_0x27449c){const _0x3ddd6c=_0x2f400e;for(const _0x50cded in _0x27449c){'orYRJ'!==_0x3ddd6c(0x1f4)?this['contents'][_0x50cded]=_0x27449c[_0x50cded]:(_0x12584e=this[_0x3ddd6c(0x1b6)](),_0x7c657a[_0x3ddd6c(0x19e)][_0x3ddd6c(0x166)][_0x3ddd6c(0x263)](this,_0x52ddba));}},VisuMZ[_0x2f400e(0x19e)]['Window_Base_update']=Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x27e)],Window_Base[_0x2f400e(0x3eb)]['update']=function(){const _0x5cba10=_0x2f400e;VisuMZ[_0x5cba10(0x19e)][_0x5cba10(0x32f)][_0x5cba10(0x263)](this),this[_0x5cba10(0x340)]();},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x33f)]=function(){return![];},Window_Base['prototype'][_0x2f400e(0x340)]=function(){const _0x594cbd=_0x2f400e;if(this[_0x594cbd(0x2f3)]>0x0){if(this['canMove']()){if(_0x594cbd(0x1b3)!==_0x594cbd(0x1b3))return this['processAutoSize'](_0x3c6a75,!![],!![]),this['processAutoPosition'](_0x594cbd(0x1b4),_0x53a3fa(_0x54e014)||0x1),'';else this['x']=this['applyMoveEasing'](this['x'],this['_moveTargetX']),this['y']=this[_0x594cbd(0x2a2)](this['y'],this[_0x594cbd(0x2ef)]),this[_0x594cbd(0x160)]=this[_0x594cbd(0x2a2)](this[_0x594cbd(0x160)],this[_0x594cbd(0x1c8)]),this[_0x594cbd(0x151)]=this[_0x594cbd(0x2a2)](this['height'],this[_0x594cbd(0x155)]),this[_0x594cbd(0x3a1)]();}this[_0x594cbd(0x2f3)]--;}},Window_Base['prototype'][_0x2f400e(0x3a1)]=function(_0x50fa37,_0x5929bf){const _0x524a20=_0x2f400e;!_0x50fa37&&(_0x524a20(0x2d5)===_0x524a20(0x2d5)?(this[_0x524a20(0x160)]=Math['min'](this[_0x524a20(0x160)],Graphics[_0x524a20(0x160)]),this[_0x524a20(0x151)]=Math[_0x524a20(0x2bf)](this[_0x524a20(0x151)],Graphics[_0x524a20(0x151)])):(_0x1f2b9[_0x524a20(0x19e)]['Game_Party_gainItem']['call'](this,_0x459fd8,_0x1fc1f0,_0x184a29),_0x3915ab>0x0&&this[_0x524a20(0x186)](_0x259154,_0x20133a)));if(!_0x5929bf){const _0x3fd064=-(Math[_0x524a20(0x181)](Graphics[_0x524a20(0x160)]-Graphics[_0x524a20(0x35c)])/0x2),_0x1cd635=_0x3fd064+Graphics[_0x524a20(0x160)]-this[_0x524a20(0x160)],_0x36e238=-(Math[_0x524a20(0x181)](Graphics[_0x524a20(0x151)]-Graphics[_0x524a20(0x289)])/0x2),_0x5e42e3=_0x36e238+Graphics[_0x524a20(0x151)]-this[_0x524a20(0x151)];this['x']=this['x'][_0x524a20(0x25f)](_0x3fd064,_0x1cd635),this['y']=this['y'][_0x524a20(0x25f)](_0x36e238,_0x5e42e3);}},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x2a2)]=function(_0x1e7e4c,_0x28a528){const _0x258186=_0x2f400e,_0x163470=this[_0x258186(0x2f3)],_0x5c3ecf=this[_0x258186(0x2e2)],_0x40a386=this['calcMoveEasing']((_0x5c3ecf-_0x163470)/_0x5c3ecf),_0x33970d=this[_0x258186(0x27a)]((_0x5c3ecf-_0x163470+0x1)/_0x5c3ecf),_0x2145a3=(_0x1e7e4c-_0x28a528*_0x40a386)/(0x1-_0x40a386);return _0x2145a3+(_0x28a528-_0x2145a3)*_0x33970d;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x27a)]=function(_0x2ba9db){const _0x29fd4e=_0x2f400e,_0x25da36=0x2;switch(this['_moveEasingType']){case 0x0:return _0x2ba9db;case 0x1:return this[_0x29fd4e(0x253)](_0x2ba9db,_0x25da36);case 0x2:return this[_0x29fd4e(0x2ae)](_0x2ba9db,_0x25da36);case 0x3:return this[_0x29fd4e(0x23e)](_0x2ba9db,_0x25da36);default:return Imported['VisuMZ_0_CoreEngine']?_0x29fd4e(0x2e0)===_0x29fd4e(0x1d5)?_0xedc205[_0x29fd4e(0x1b1)]():VisuMZ[_0x29fd4e(0x2a2)](_0x2ba9db,this[_0x29fd4e(0x161)]):_0x2ba9db;}},Window_Base[_0x2f400e(0x3eb)]['moveTo']=function(_0x27fa66,_0x59587c,_0x1841bc,_0x17cd3b,_0x46a358,_0x32c601){const _0x38f98e=_0x2f400e;this[_0x38f98e(0x1e6)]=_0x27fa66,this['_moveTargetY']=_0x59587c,this['_moveTargetWidth']=_0x1841bc||this[_0x38f98e(0x160)],this[_0x38f98e(0x155)]=_0x17cd3b||this[_0x38f98e(0x151)],this[_0x38f98e(0x2f3)]=_0x46a358||0x1;if(this[_0x38f98e(0x2f3)]<=0x0)this[_0x38f98e(0x2f3)]=0x1;this[_0x38f98e(0x2e2)]=this['_moveDuration'],this['_moveEasingType']=_0x32c601||0x0;if(_0x46a358<=0x0)this[_0x38f98e(0x340)]();},Window_Base['prototype'][_0x2f400e(0x286)]=function(_0x2e17f7,_0x2018b3,_0x2993de,_0x438563,_0x4e8884,_0x2832e8){const _0x83ed70=_0x2f400e;this[_0x83ed70(0x1e6)]=this['x']+_0x2e17f7,this[_0x83ed70(0x2ef)]=this['y']+_0x2018b3,this['_moveTargetWidth']=this[_0x83ed70(0x160)]+(_0x2993de||0x0),this[_0x83ed70(0x155)]=this[_0x83ed70(0x151)]+(_0x438563||0x0),this[_0x83ed70(0x2f3)]=_0x4e8884||0x1;if(this[_0x83ed70(0x2f3)]<=0x0)this['_moveDuration']=0x1;this[_0x83ed70(0x2e2)]=this[_0x83ed70(0x2f3)],this[_0x83ed70(0x161)]=_0x2832e8||0x0;if(_0x4e8884<=0x0)this[_0x83ed70(0x340)]();},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x370)]=function(_0x3e0900,_0x212620){const _0x846a55=_0x2f400e;this[_0x846a55(0x1dc)](this[_0x846a55(0x237)]['x'],this[_0x846a55(0x237)]['y'],this[_0x846a55(0x237)][_0x846a55(0x160)],this[_0x846a55(0x237)][_0x846a55(0x151)],_0x3e0900,_0x212620);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x1d6)]=Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x35d)],Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x35d)]=function(_0x3be0ef){const _0xdb8973=_0x2f400e;if(this[_0xdb8973(0x36f)]())return;_0x3be0ef=_0x3be0ef[_0xdb8973(0x374)](/\,/g,''),this[_0xdb8973(0x382)]=this[_0xdb8973(0x382)]||[],this[_0xdb8973(0x382)][_0xdb8973(0x384)](this[_0xdb8973(0x30d)][_0xdb8973(0x273)]),VisuMZ['MessageCore']['Window_Base_changeTextColor'][_0xdb8973(0x263)](this,_0x3be0ef);},Window_Base[_0x2f400e(0x3eb)]['processPreviousColor']=function(_0x2f8724){const _0x38565f=_0x2f400e;this[_0x38565f(0x283)](_0x2f8724);if(this['isColorLocked']())return;_0x2f8724[_0x38565f(0x20a)]&&('tmANU'!=='zfoyz'?(this[_0x38565f(0x382)]=this[_0x38565f(0x382)]||[],this['contents'][_0x38565f(0x273)]=this[_0x38565f(0x382)]['shift']()||ColorManager['normalColor']()):(_0x111fd9[_0x38565f(0x19e)]['Window_Base_processControlCharacter']['call'](this,_0x36d376,_0x26fb1d),_0x47da85===_0x38565f(0x16b)&&this[_0x38565f(0x261)](_0x5c8cf0)));},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x212)]=function(_0x18789a){const _0x20cc8e=_0x2f400e;return _0x18789a=this[_0x20cc8e(0x1df)](_0x18789a),_0x18789a=this[_0x20cc8e(0x156)](_0x18789a),_0x18789a=this['convertVariableEscapeCharacters'](_0x18789a),_0x18789a=this[_0x20cc8e(0x284)](_0x18789a),_0x18789a=this[_0x20cc8e(0x39f)](_0x18789a),_0x18789a=this['convertFontSettingsEscapeCharacters'](_0x18789a),_0x18789a=this[_0x20cc8e(0x364)](_0x18789a),_0x18789a=this[_0x20cc8e(0x238)](_0x18789a),_0x18789a=this[_0x20cc8e(0x35f)](_0x18789a),_0x18789a=this[_0x20cc8e(0x25a)](_0x18789a),_0x18789a=this['convertMessageCoreEscapeActions'](_0x18789a),_0x18789a=this[_0x20cc8e(0x191)](_0x18789a),_0x18789a=this['postConvertEscapeCharacters'](_0x18789a),_0x18789a=this[_0x20cc8e(0x1b8)](_0x18789a),_0x18789a=this[_0x20cc8e(0x2e9)](_0x18789a),_0x18789a=this[_0x20cc8e(0x2a4)](_0x18789a),_0x18789a;},Window_Base['prototype']['convertTextMacros']=function(_0x3b143a){const _0xbde865=_0x2f400e;this[_0xbde865(0x338)]=![];for(const _0x5ee406 of VisuMZ[_0xbde865(0x19e)][_0xbde865(0x14f)][_0xbde865(0x38a)]){if(_0x3b143a[_0xbde865(0x26a)](_0x5ee406[_0xbde865(0x3e6)])){if('mUAIf'==='HmALI'){const _0x4ba9cf=_0x41a8b6['parse']('['+_0x18af3c['$1']['match'](/\d+/g)+']');for(const _0x4d8243 of _0x4ba9cf){if(!_0x4e7d9f[_0xbde865(0x165)](_0x4d8243))return![];}return!![];}else this['_textMacroFound']=!![],_0x3b143a=_0x3b143a[_0xbde865(0x374)](_0x5ee406[_0xbde865(0x3e6)],_0x5ee406['textCodeResult'][_0xbde865(0x147)](this));}}return _0x3b143a;},Window_Base['prototype'][_0x2f400e(0x156)]=function(_0x51e663){const _0x5bb43e=_0x2f400e;return _0x51e663=_0x51e663[_0x5bb43e(0x374)](/\\/g,'\x1b'),_0x51e663=_0x51e663[_0x5bb43e(0x374)](/\x1b\x1b/g,'\x5c'),_0x51e663;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x1b8)]=function(_0x474a26){const _0x3a4a5d=_0x2f400e;for(;;){if(_0x474a26[_0x3a4a5d(0x26a)](/\\V\[(\d+)\]/gi))_0x474a26=_0x474a26['replace'](/\\V\[(\d+)\]/gi,(_0x57de2c,_0x44bdae)=>this['convertBackslashCharacters'](String($gameVariables[_0x3a4a5d(0x165)](parseInt(_0x44bdae)))));else{if(_0x474a26[_0x3a4a5d(0x26a)](/\x1bV\[(\d+)\]/gi))'LVvQB'!=='LVvQB'?(_0x29f953[_0x3a4a5d(0x19e)][_0x3a4a5d(0x365)]['call'](this),this['_messageCommonEvents']=[]):_0x474a26=_0x474a26['replace'](/\x1bV\[(\d+)\]/gi,(_0x275d3d,_0x1dc16d)=>this[_0x3a4a5d(0x156)](String($gameVariables[_0x3a4a5d(0x165)](parseInt(_0x1dc16d)))));else{if(_0x3a4a5d(0x3d6)==='uDXNM')break;else{for(const _0x33cc99 of _0x2e0eb7[_0x3a4a5d(0x19e)][_0x3a4a5d(0x14f)][_0x3a4a5d(0x280)]){_0xdfd4ba[_0x3a4a5d(0x26a)](_0x33cc99[_0x3a4a5d(0x3e6)])&&(_0x4b5eb1=_0x5c7761[_0x3a4a5d(0x374)](_0x33cc99[_0x3a4a5d(0x3e6)],_0x33cc99['textCodeResult'][_0x3a4a5d(0x147)](this)),_0x56922b=this[_0x3a4a5d(0x1b8)](_0x4649d0));}return _0x1750d5;}}}}return _0x474a26;},Window_Base['prototype'][_0x2f400e(0x284)]=function(_0x2ea70e){return this['registerActorNameAutoColorChanges'](),_0x2ea70e;},Window_Base[_0x2f400e(0x3eb)]['postConvertEscapeCharacters']=function(_0x340924){return _0x340924;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x39f)]=function(_0x23a19e){const _0x537d3d=_0x2f400e;return _0x23a19e=_0x23a19e['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x23a19e=_0x23a19e['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x23a19e=_0x23a19e[_0x537d3d(0x374)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x23a19e;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x2ad)]=function(_0x415bc3){const _0x70c2fb=_0x2f400e;return _0x415bc3=_0x415bc3[_0x70c2fb(0x374)](/<B>/gi,_0x70c2fb(0x159)),_0x415bc3=_0x415bc3[_0x70c2fb(0x374)](/<\/B>/gi,_0x70c2fb(0x1f7)),_0x415bc3=_0x415bc3[_0x70c2fb(0x374)](/<I>/gi,_0x70c2fb(0x26d)),_0x415bc3=_0x415bc3['replace'](/<\/I>/gi,_0x70c2fb(0x25c)),_0x415bc3;},Window_Base['prototype'][_0x2f400e(0x364)]=function(_0x5c8311){const _0x1e9b72=_0x2f400e;return _0x5c8311=_0x5c8311[_0x1e9b72(0x374)](/<LEFT>/gi,_0x1e9b72(0x2b1)),_0x5c8311=_0x5c8311[_0x1e9b72(0x374)](/<\/LEFT>/gi,_0x1e9b72(0x1ab)),_0x5c8311=_0x5c8311[_0x1e9b72(0x374)](/<CENTER>/gi,_0x1e9b72(0x228)),_0x5c8311=_0x5c8311[_0x1e9b72(0x374)](/<\/CENTER>/gi,_0x1e9b72(0x1ab)),_0x5c8311=_0x5c8311[_0x1e9b72(0x374)](/<RIGHT>/gi,_0x1e9b72(0x30b)),_0x5c8311=_0x5c8311['replace'](/<\/RIGHT>/gi,_0x1e9b72(0x1ab)),_0x5c8311;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x238)]=function(_0xd00ecc){const _0x29fe4c=_0x2f400e;return _0xd00ecc=_0xd00ecc[_0x29fe4c(0x374)](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0xd00ecc=_0xd00ecc[_0x29fe4c(0x374)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0xd00ecc=_0xd00ecc['replace'](/\(\(\(/gi,_0x29fe4c(0x1a4)),_0xd00ecc=_0xd00ecc[_0x29fe4c(0x374)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0xd00ecc;},Window_Base[_0x2f400e(0x3eb)]['convertBaseEscapeCharacters']=function(_0x4365a9){const _0x534970=_0x2f400e;return _0x4365a9=_0x4365a9[_0x534970(0x374)](/\x1bN\[(\d+)\]/gi,(_0x285216,_0x104d35)=>this['actorName'](parseInt(_0x104d35))),_0x4365a9=_0x4365a9[_0x534970(0x374)](/\x1bP\[(\d+)\]/gi,(_0x561f0b,_0x269595)=>this['partyMemberName'](parseInt(_0x269595))),_0x4365a9=_0x4365a9[_0x534970(0x374)](/\x1bG/gi,TextManager[_0x534970(0x182)]),_0x4365a9;},Window_Base[_0x2f400e(0x3eb)]['convertHardcodedEscapeReplacements']=function(_0x5b817c){const _0x20022c=_0x2f400e;return _0x5b817c=_0x5b817c[_0x20022c(0x374)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x20022c(0x36a)]()),_0x5b817c=_0x5b817c[_0x20022c(0x374)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x20022c(0x244)]()),_0x5b817c=_0x5b817c[_0x20022c(0x374)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x20022c(0x3e4)](!![])),_0x5b817c=_0x5b817c[_0x20022c(0x374)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x20022c(0x3e4)](![])),_0x5b817c;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x36a)]=function(){const _0x380ccd=_0x2f400e;if(!SceneManager[_0x380ccd(0x2fc)]())return'';if(BattleManager[_0x380ccd(0x180)])return BattleManager['_target'][_0x380ccd(0x16a)]();if(BattleManager['_targets'][0x0])return BattleManager[_0x380ccd(0x379)][0x0][_0x380ccd(0x16a)]();return'';},Window_Base[_0x2f400e(0x3eb)]['battleUserName']=function(){const _0x3b1c10=_0x2f400e;if(!SceneManager['isSceneBattle']())return'';let _0x2eb563=null;_0x2eb563=BattleManager[_0x3b1c10(0x25b)];if(!_0x2eb563&&BattleManager[_0x3b1c10(0x296)]()){if(_0x3b1c10(0x327)!==_0x3b1c10(0x3e8))_0x2eb563=BattleManager[_0x3b1c10(0x1c1)]();else{const _0x36a32f=0xb-_0x2c6eda[_0x3b1c10(0x26b)];_0x74e4da=_0x442c74[_0x3b1c10(0x1e2)](_0x27ea86*_0x36a32f),this[_0x3b1c10(0x23d)]=_0x3a71b4,this[_0x3b1c10(0x2f7)]=_0x2b943e;}}return _0x2eb563?_0x2eb563[_0x3b1c10(0x16a)]():'';},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x3e4)]=function(_0x352e36){const _0x5609e7=_0x2f400e;if(!SceneManager[_0x5609e7(0x2fc)]())return'';let _0x146519=BattleManager['_action']||null;!_0x146519&&BattleManager[_0x5609e7(0x296)]()&&(_0x146519=BattleManager[_0x5609e7(0x28f)]());if(_0x146519&&_0x146519[_0x5609e7(0x1ee)]()){if(_0x5609e7(0x203)===_0x5609e7(0x203)){let _0x5245ef='';if(_0x352e36)_0x5245ef+=_0x5609e7(0x34d)[_0x5609e7(0x209)](_0x146519['item']()[_0x5609e7(0x34e)]);return _0x5245ef+=_0x146519[_0x5609e7(0x1ee)]()['name'],_0x5245ef;}else this[_0x5609e7(0x338)]=!![],_0x490e3f=_0x4917c1[_0x5609e7(0x374)](_0xdd4183['textCodeCheck'],_0x1f8c60['textCodeResult'][_0x5609e7(0x147)](this));}return'';},Window_Base[_0x2f400e(0x3eb)]['convertMessageCoreEscapeActions']=function(_0x22f152){const _0x15e684=_0x2f400e;for(const _0x29ae1f of VisuMZ[_0x15e684(0x19e)][_0x15e684(0x14f)][_0x15e684(0x1a6)]){if(_0x15e684(0x378)!=='HIAUd')this[_0x15e684(0x372)](![]);else{if(_0x22f152[_0x15e684(0x26a)](_0x29ae1f[_0x15e684(0x3e6)])){if(_0x15e684(0x304)!==_0x15e684(0x36c))_0x22f152=_0x22f152[_0x15e684(0x374)](_0x29ae1f['textCodeCheck'],_0x29ae1f[_0x15e684(0x3d7)]),_0x22f152=this[_0x15e684(0x1b8)](_0x22f152);else{const _0x15138b=this[_0x15e684(0x38e)](_0x3fe68c),_0x2890a5=_0x301783['getChoiceListTextAlign']()!=='default'?_0x15e684(0x188)['format'](_0x131524[_0x15e684(0x3c7)]()):'',_0x2812e2=_0x2890a5+this[_0x15e684(0x18e)](_0xb5f660);this['changePaintOpacity'](this['isCommandEnabled'](_0x25ce84));const _0x13b192=this[_0x15e684(0x22c)](_0x2812e2)['height'],_0x3ab029=_0x2b060d[_0x15e684(0x19c)](_0x15138b['y'],_0x15138b['y']+_0x4524c8[_0x15e684(0x1e2)]((_0x15138b[_0x15e684(0x151)]-_0x13b192)/0x2));this[_0x15e684(0x315)](_0x2812e2,_0x15138b['x'],_0x3ab029,_0x15138b[_0x15e684(0x160)]);}}}}return _0x22f152;},Window_Base[_0x2f400e(0x3eb)]['convertMessageCoreEscapeReplacements']=function(_0x33a5ab){const _0x4c51ca=_0x2f400e;for(const _0x3e5432 of VisuMZ[_0x4c51ca(0x19e)][_0x4c51ca(0x14f)][_0x4c51ca(0x280)]){_0x33a5ab[_0x4c51ca(0x26a)](_0x3e5432[_0x4c51ca(0x3e6)])&&(_0x33a5ab=_0x33a5ab[_0x4c51ca(0x374)](_0x3e5432['textCodeCheck'],_0x3e5432[_0x4c51ca(0x3d7)][_0x4c51ca(0x147)](this)),_0x33a5ab=this[_0x4c51ca(0x1b8)](_0x33a5ab));}return _0x33a5ab;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x1b0)]=function(_0xc3d992){const _0x203a60=_0x2f400e,_0x4c5a3d=_0xc3d992>=0x1?$gameActors[_0x203a60(0x1c1)](_0xc3d992):null,_0x462627=_0x4c5a3d?_0x4c5a3d[_0x203a60(0x16a)]():'',_0x17811d=Number(VisuMZ[_0x203a60(0x19e)][_0x203a60(0x14f)][_0x203a60(0x362)]['Actors']);return this[_0x203a60(0x196)]()&&_0x17811d!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x203a60(0x209)](_0x17811d,_0x462627):_0x462627;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x1fd)]=function(_0x23e78c){const _0x507ea1=_0x2f400e,_0x1ea491=_0x23e78c>=0x1?$gameParty[_0x507ea1(0x346)]()[_0x23e78c-0x1]:null,_0x58422e=_0x1ea491?_0x1ea491[_0x507ea1(0x16a)]():'',_0x478eb5=Number(VisuMZ[_0x507ea1(0x19e)][_0x507ea1(0x14f)][_0x507ea1(0x362)]['Actors']);if(this[_0x507ea1(0x196)]()&&_0x478eb5!==0x0){if('HzrUC'===_0x507ea1(0x398))_0x509947['MessageCore']['Game_Map_updateEvents']['call'](this),this['updateMessageCommonEvents']();else return _0x507ea1(0x245)['format'](_0x478eb5,_0x58422e);}else return _0x58422e;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x2e9)]=function(_0xa59d2b){const _0x4085c7=_0x2f400e;return this[_0x4085c7(0x196)]()&&(_0xa59d2b=this[_0x4085c7(0x17e)](_0xa59d2b),_0xa59d2b=this[_0x4085c7(0x3da)](_0xa59d2b)),_0xa59d2b;},Window_Base[_0x2f400e(0x3eb)]['processStoredAutoColorChanges']=function(_0xeb394b){const _0x3c1be4=_0x2f400e;for(autoColor of VisuMZ['MessageCore']['AutoColorRegExp']){_0xeb394b=_0xeb394b[_0x3c1be4(0x374)](autoColor[0x0],autoColor[0x1]);}return _0xeb394b;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x1fe)]=function(){const _0x291d77=_0x2f400e;this[_0x291d77(0x3de)]=[];},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x279)]=function(){const _0x593c0b=_0x2f400e;this[_0x593c0b(0x1fe)]();const _0x201e84=VisuMZ[_0x593c0b(0x19e)][_0x593c0b(0x14f)][_0x593c0b(0x362)],_0x54a2fb=_0x201e84[_0x593c0b(0x391)];if(_0x54a2fb<=0x0)return;for(const _0x118c58 of $gameActors['_data']){if(_0x593c0b(0x131)!==_0x593c0b(0x3e7)){if(!_0x118c58)continue;const _0x39c55a=_0x118c58[_0x593c0b(0x16a)]();if(_0x39c55a[_0x593c0b(0x2d6)]()[_0x593c0b(0x13e)]<=0x0)continue;if(/^\d+$/[_0x593c0b(0x30f)](_0x39c55a))continue;if(_0x39c55a[_0x593c0b(0x26a)](/-----/i))continue;let _0x523d43=VisuMZ[_0x593c0b(0x19e)][_0x593c0b(0x34b)](_0x39c55a);const _0x12375c=new RegExp('\x5cb'+_0x523d43+'\x5cb','g'),_0x2fd830=_0x593c0b(0x245)[_0x593c0b(0x209)](_0x54a2fb,_0x39c55a);this[_0x593c0b(0x3de)][_0x593c0b(0x2d0)]([_0x12375c,_0x2fd830]);}else this['_textColorStack']=this['_textColorStack']||[],this[_0x593c0b(0x30d)][_0x593c0b(0x273)]=this[_0x593c0b(0x382)][_0x593c0b(0x2fa)]()||_0xd0f32a[_0x593c0b(0x295)]();}},Window_Base['prototype']['processActorNameAutoColorChanges']=function(_0xc8d680){const _0x2175c9=_0x2f400e;this[_0x2175c9(0x3de)]===undefined&&this[_0x2175c9(0x279)]();for(autoColor of this[_0x2175c9(0x3de)]){_0xc8d680=_0xc8d680[_0x2175c9(0x374)](autoColor[0x0],autoColor[0x1]);}return _0xc8d680;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x201)]=function(_0x521718,_0x2ab852,_0x54cbd7){const _0x2bb947=_0x2f400e;if(!_0x521718)return'';const _0x3eb911=_0x521718[_0x2ab852];let _0x46c946='';if(_0x3eb911&&_0x54cbd7&&_0x3eb911[_0x2bb947(0x34e)]){if('xKYBW'===_0x2bb947(0x187)){const _0x1e5932=_0x2bb947(0x20e);_0x46c946=_0x1e5932['format'](_0x3eb911['iconIndex'],_0x3eb911[_0x2bb947(0x16a)]);}else{const _0x567c77=_0x26e551(_0x423268['$1']);_0x567c77!==_0x20ec41[_0x59d760][_0x2bb947(0x2a3)]&&(_0x8c3bd7('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2bb947(0x209)](_0x522e6e,_0x567c77)),_0x497f85[_0x2bb947(0x2e3)]());}}else{if(_0x3eb911)_0x46c946=_0x3eb911['name'];else{if(_0x2bb947(0x3dd)===_0x2bb947(0x2c8)){const _0x2c8769=_0x4c30cd['min'](_0x27e008['width'],_0x236e9b[_0x2bb947(0x30c)]()),_0x11625e=_0x37096d[_0x2bb947(0x3bf)](),_0x351529=this[_0x2bb947(0x217)](_0x11625e,![]),_0x42a611=(_0x2a9d3c[_0x2bb947(0x35c)]-_0x2c8769)/0x2,_0x2710a9=0x0;return new _0x35328d(_0x42a611,_0x2710a9,_0x2c8769,_0x351529);}else _0x46c946='';}}if(this[_0x2bb947(0x196)]()){if(_0x2bb947(0x3bc)!==_0x2bb947(0x1af))_0x46c946=this[_0x2bb947(0x13a)](_0x46c946,_0x521718);else{if(!_0x5568c9)return;this[_0x2bb947(0x1de)]=![],_0x3f6b6a['text']=this[_0x2bb947(0x1df)](_0x2ec03a[_0x2bb947(0x1d4)]),this[_0x2bb947(0x338)]&&(_0x586da0[_0x2bb947(0x1d4)]=this['prepareWordWrapEscapeCharacters'](_0x441cee['text']),this[_0x2bb947(0x1de)]=!![]);}}return _0x46c946;},Window_Base[_0x2f400e(0x3eb)]['lastGainedObjectName']=function(_0x19f6a4){const _0x59f20d=_0x2f400e,_0x351135=$gameParty[_0x59f20d(0x162)]();if(_0x351135['id']<0x0)return'';let _0x13401d=null;if(_0x351135[_0x59f20d(0x325)]===0x0)_0x13401d=$dataItems[_0x351135['id']];if(_0x351135[_0x59f20d(0x325)]===0x1)_0x13401d=$dataWeapons[_0x351135['id']];if(_0x351135[_0x59f20d(0x325)]===0x2)_0x13401d=$dataArmors[_0x351135['id']];if(!_0x13401d)return'';return _0x19f6a4?_0x59f20d(0x20e)[_0x59f20d(0x209)](_0x13401d[_0x59f20d(0x34e)],_0x13401d[_0x59f20d(0x16a)]):_0x13401d[_0x59f20d(0x16a)];},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x28e)]=function(){const _0x3bcd62=_0x2f400e,_0x352868=$gameParty['getLastGainedItemData']();if(_0x352868['id']<=0x0)return'';return _0x352868[_0x3bcd62(0x392)];},Window_Base[_0x2f400e(0x3eb)]['applyDatabaseAutoColor']=function(_0x373af9,_0x2824c8){const _0x20d832=_0x2f400e,_0x492003=VisuMZ[_0x20d832(0x19e)][_0x20d832(0x14f)][_0x20d832(0x362)];let _0x4807e9=0x0;if(_0x2824c8===$dataActors)_0x4807e9=_0x492003[_0x20d832(0x391)];if(_0x2824c8===$dataClasses)_0x4807e9=_0x492003[_0x20d832(0x14e)];if(_0x2824c8===$dataSkills)_0x4807e9=_0x492003['Skills'];if(_0x2824c8===$dataItems)_0x4807e9=_0x492003['Items'];if(_0x2824c8===$dataWeapons)_0x4807e9=_0x492003[_0x20d832(0x32d)];if(_0x2824c8===$dataArmors)_0x4807e9=_0x492003[_0x20d832(0x276)];if(_0x2824c8===$dataEnemies)_0x4807e9=_0x492003[_0x20d832(0x303)];if(_0x2824c8===$dataStates)_0x4807e9=_0x492003[_0x20d832(0x27b)];return _0x4807e9>0x0&&(_0x373af9=_0x20d832(0x245)['format'](_0x4807e9,_0x373af9)),_0x373af9;},Window_Base[_0x2f400e(0x3eb)]['prepareWordWrapEscapeCharacters']=function(_0x431dcd){const _0x8d5326=_0x2f400e;_0x431dcd=_0x431dcd['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0xe3e913,_0x43b43d)=>this[_0x8d5326(0x372)](!![])),_0x431dcd=_0x431dcd['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x5d19fb,_0x5371ab)=>this[_0x8d5326(0x372)](![])),_0x431dcd=_0x431dcd[_0x8d5326(0x374)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x2d045c,_0x5f0181)=>this[_0x8d5326(0x372)](![]));if(_0x431dcd[_0x8d5326(0x26a)](Window_Message[_0x8d5326(0x1d0)]))this[_0x8d5326(0x372)](![]);else _0x431dcd['match'](Window_Message[_0x8d5326(0x352)])&&this[_0x8d5326(0x372)](![]);if(!this[_0x8d5326(0x1ba)]())return _0x431dcd;if(_0x431dcd[_0x8d5326(0x13e)]<=0x0)return _0x431dcd;if(VisuMZ[_0x8d5326(0x19e)][_0x8d5326(0x14f)][_0x8d5326(0x31e)]['LineBreakSpace'])_0x431dcd=_0x431dcd[_0x8d5326(0x374)](/[\n\r]+/g,'\x20'),_0x431dcd=_0x431dcd[_0x8d5326(0x374)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');else{if(_0x8d5326(0x264)!==_0x8d5326(0x1f6))_0x431dcd=_0x431dcd[_0x8d5326(0x374)](/[\n\r]+/g,''),_0x431dcd=_0x431dcd[_0x8d5326(0x374)](/<(?:BR|LINEBREAK)>/gi,'\x0a');else return'';}return _0x431dcd=this['addWrapBreakAfterPunctuation'](_0x431dcd),_0x431dcd=_0x431dcd[_0x8d5326(0x29e)]('\x20')[_0x8d5326(0x235)](_0x8d5326(0x16b)),_0x431dcd=_0x431dcd[_0x8d5326(0x374)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x431dcd=_0x431dcd['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x431dcd;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x20f)]=function(_0x2c1613){return _0x2c1613;},VisuMZ['MessageCore'][_0x2f400e(0x385)]=Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x2f6)],Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x2f6)]=function(_0x1f6892){const _0x4eeef9=_0x2f400e;VisuMZ[_0x4eeef9(0x19e)][_0x4eeef9(0x385)][_0x4eeef9(0x263)](this,_0x1f6892),this['processTextAlignmentX'](_0x1f6892);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x137)]=Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x3ba)],Window_Base[_0x2f400e(0x3eb)]['processControlCharacter']=function(_0x26a4a8,_0x470312){const _0xfdb341=_0x2f400e;VisuMZ[_0xfdb341(0x19e)]['Window_Base_processControlCharacter'][_0xfdb341(0x263)](this,_0x26a4a8,_0x470312);if(_0x470312==='\x1bWrapBreak[0]'){if(_0xfdb341(0x3a4)!==_0xfdb341(0x3a4)){const _0x153a13=this[_0xfdb341(0x2f3)],_0x4583c1=this[_0xfdb341(0x2e2)],_0x452bb5=this['calcMoveEasing']((_0x4583c1-_0x153a13)/_0x4583c1),_0x447566=this[_0xfdb341(0x27a)]((_0x4583c1-_0x153a13+0x1)/_0x4583c1),_0x4b689f=(_0x38f412-_0x1511f9*_0x452bb5)/(0x1-_0x452bb5);return _0x4b689f+(_0x3149b0-_0x4b689f)*_0x447566;}else this['processWrapBreak'](_0x26a4a8);}},Window_Base['prototype'][_0x2f400e(0x33d)]=function(_0x52cd7b){const _0x120776=_0x2f400e;var _0x7e3a73=/^\<(.*?)\>/['exec'](_0x52cd7b[_0x120776(0x1d4)][_0x120776(0x349)](_0x52cd7b['index']));return _0x7e3a73?(_0x52cd7b[_0x120776(0x2ff)]+=_0x7e3a73[0x0][_0x120776(0x13e)],String(_0x7e3a73[0x0][_0x120776(0x349)](0x1,_0x7e3a73[0x0][_0x120776(0x13e)]-0x1))):'';},VisuMZ[_0x2f400e(0x19e)]['Window_Base_processEscapeCharacter']=Window_Base[_0x2f400e(0x3eb)]['processEscapeCharacter'],Window_Base['prototype'][_0x2f400e(0x22a)]=function(_0x1155ea,_0x21f9f1){const _0x55823b=_0x2f400e;switch(_0x1155ea){case'C':if(_0x21f9f1[_0x55823b(0x20a)]){if(_0x55823b(0x274)===_0x55823b(0x274))VisuMZ[_0x55823b(0x19e)][_0x55823b(0x2ed)][_0x55823b(0x263)](this,_0x1155ea,_0x21f9f1);else{const _0x301a9a=this['getConfigValue'](_0x55823b(0x26b));return _0x301a9a>0xa?_0x3908ac['instantTextSpeed']:_0x301a9a;}}else this['obtainEscapeParam'](_0x21f9f1);break;case'I':case'{':case'}':VisuMZ['MessageCore']['Window_Base_processEscapeCharacter'][_0x55823b(0x263)](this,_0x1155ea,_0x21f9f1);break;case'FS':this['processFsTextCode'](_0x21f9f1);break;case'PX':this[_0x55823b(0x329)](_0x21f9f1);break;case'PY':this[_0x55823b(0x1ea)](_0x21f9f1);break;case'BOLD':this[_0x55823b(0x1b9)](this[_0x55823b(0x283)](_0x21f9f1));break;case _0x55823b(0x339):this[_0x55823b(0x30a)](_0x21f9f1);break;case _0x55823b(0x214):this['processColorLock'](_0x21f9f1);break;case'COMMONEVENT':this[_0x55823b(0x1a1)](_0x21f9f1);break;case _0x55823b(0x157):this['processFontChangeItalic'](this[_0x55823b(0x283)](_0x21f9f1));break;case'PICTURE':this[_0x55823b(0x367)](_0x21f9f1);break;case _0x55823b(0x206):this['processPreviousColor'](_0x21f9f1);break;case _0x55823b(0x37a):this[_0x55823b(0x1e0)](_0x21f9f1);break;case'WAIT':this[_0x55823b(0x2e7)](_0x21f9f1);break;case _0x55823b(0x3d1):this[_0x55823b(0x261)](_0x21f9f1);break;default:this[_0x55823b(0x308)](_0x1155ea,_0x21f9f1);}},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x308)]=function(_0x586ec9,_0x5192f6){const _0x4ceb20=_0x2f400e;for(const _0x4f95e2 of VisuMZ[_0x4ceb20(0x19e)][_0x4ceb20(0x14f)][_0x4ceb20(0x1a6)]){if(_0x4ceb20(0x26c)===_0x4ceb20(0x26c)){if(_0x4f95e2[_0x4ceb20(0x2f5)]===_0x586ec9){if(_0x4f95e2[_0x4ceb20(0x3b0)]==='')this[_0x4ceb20(0x283)](_0x5192f6);_0x4f95e2['ActionJS'][_0x4ceb20(0x263)](this,_0x5192f6);if(this['constructor']===Window_Message){const _0x16162a=_0x4f95e2['CommonEvent']||0x0;if(_0x16162a>0x0)this[_0x4ceb20(0x2da)](_0x16162a);}}}else{_0x326773['ConvertParams'](_0x275486,_0xbcb6e),_0x324e2c['setMessageWindowXyOffsets'](_0x5ed0d9['OffsetX'],_0x26a2fb[_0x4ceb20(0x317)]);const _0x5f3f63=_0x1c3f24[_0x4ceb20(0x3c4)]['_messageWindow'];_0x5f3f63&&(_0x5f3f63[_0x4ceb20(0x328)](),_0x5f3f63[_0x4ceb20(0x2ba)](),_0x5f3f63[_0x4ceb20(0x3e2)]());}}},Window_Base[_0x2f400e(0x3eb)]['makeFontBigger']=function(){const _0x587b6e=_0x2f400e;this[_0x587b6e(0x30d)][_0x587b6e(0x3d3)]+=VisuMZ[_0x587b6e(0x19e)]['Settings'][_0x587b6e(0x218)]['FontChangeValue'],this[_0x587b6e(0x30d)][_0x587b6e(0x3d3)]=Math[_0x587b6e(0x2bf)](this[_0x587b6e(0x30d)][_0x587b6e(0x3d3)],VisuMZ[_0x587b6e(0x19e)][_0x587b6e(0x14f)][_0x587b6e(0x218)][_0x587b6e(0x318)]);},Window_Base['prototype']['makeFontSmaller']=function(){const _0x4993a0=_0x2f400e;this[_0x4993a0(0x30d)][_0x4993a0(0x3d3)]-=VisuMZ[_0x4993a0(0x19e)][_0x4993a0(0x14f)][_0x4993a0(0x218)][_0x4993a0(0x167)],this['contents']['fontSize']=Math[_0x4993a0(0x19c)](this[_0x4993a0(0x30d)][_0x4993a0(0x3d3)],VisuMZ[_0x4993a0(0x19e)][_0x4993a0(0x14f)][_0x4993a0(0x218)][_0x4993a0(0x3e1)]);},Window_Base['prototype'][_0x2f400e(0x272)]=function(_0x904b11){const _0x25143=_0x2f400e,_0x1163e9=this['obtainEscapeParam'](_0x904b11);this['contents'][_0x25143(0x3d3)]=_0x1163e9[_0x25143(0x25f)](VisuMZ[_0x25143(0x19e)]['Settings'][_0x25143(0x218)]['FontSmallerCap'],VisuMZ['MessageCore'][_0x25143(0x14f)]['General'][_0x25143(0x318)]);},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x3b3)]=function(_0x1bda80){const _0x5a1312=_0x2f400e;let _0xf0d99c=this[_0x5a1312(0x30d)]['fontSize'];const _0x282611=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x36adc3=_0x282611[_0x5a1312(0x226)](_0x1bda80);if(!_0x36adc3)break;const _0x58098a=String(_0x36adc3[0x1])['toUpperCase']();if(_0x58098a==='{'){if(_0x5a1312(0x39e)===_0x5a1312(0x39e))this[_0x5a1312(0x345)]();else{const _0x2a02b4=_0x2b7e51[_0x5a1312(0x16a)],_0x15898a=this[_0x5a1312(0x22c)](_0x2a02b4)[_0x5a1312(0x160)],_0x54fa95=_0xb9dee7[_0x5a1312(0x37c)](_0x15898a)+this[_0x5a1312(0x158)]()*0x2;_0x590f56<_0x54fa95&&(_0x178aa5=_0x54fa95);}}else{if(_0x58098a==='}'){if(_0x5a1312(0x1a7)!==_0x5a1312(0x1a7)){const _0x39779d=_0x521826[_0x5a1312(0x19e)][_0x5a1312(0x2b3)][_0x5a1312(0x263)](this);return _0x39779d[_0x5a1312(0x26b)]=this['textSpeed'],_0x39779d;}else this[_0x5a1312(0x133)]();}else _0x58098a==='FS'&&(this['contents'][_0x5a1312(0x3d3)]=parseInt(_0x36adc3[0x3])[_0x5a1312(0x25f)](VisuMZ[_0x5a1312(0x19e)][_0x5a1312(0x14f)][_0x5a1312(0x218)][_0x5a1312(0x3e1)],VisuMZ[_0x5a1312(0x19e)][_0x5a1312(0x14f)][_0x5a1312(0x218)]['FontBiggerCap']));}this[_0x5a1312(0x30d)][_0x5a1312(0x3d3)]>_0xf0d99c&&(_0xf0d99c=this[_0x5a1312(0x30d)][_0x5a1312(0x3d3)]);}return _0xf0d99c;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x329)]=function(_0x5cca65){const _0x120818=_0x2f400e;_0x5cca65['x']=this[_0x120818(0x283)](_0x5cca65);if(VisuMZ[_0x120818(0x19e)][_0x120818(0x14f)][_0x120818(0x218)][_0x120818(0x3e9)]){if(_0x120818(0x321)!==_0x120818(0x321)){if(this['currentCommand']()&&this[_0x120818(0x21c)]()[_0x120818(0x282)][0x0][_0x120818(0x26a)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return _0x567e72[_0x120818(0x17a)][_0x120818(0x13e)]>=_0x135334['getMessageWindowRows']()&&this[_0x120818(0x2cc)]()!==0x191;}else _0x5cca65['x']+=_0x5cca65[_0x120818(0x15e)];}},Window_Base['prototype'][_0x2f400e(0x1ea)]=function(_0x5c7e9e){const _0xe0108d=_0x2f400e;_0x5c7e9e['y']=this['obtainEscapeParam'](_0x5c7e9e),VisuMZ[_0xe0108d(0x19e)][_0xe0108d(0x14f)][_0xe0108d(0x218)]['RelativePXPY']&&(_0x5c7e9e['y']+=_0x5c7e9e[_0xe0108d(0x1d1)]);},Window_Base['prototype'][_0x2f400e(0x1b9)]=function(_0x55219a){const _0x29b78b=_0x2f400e;this[_0x29b78b(0x30d)][_0x29b78b(0x17c)]=!!_0x55219a;},Window_Base['prototype'][_0x2f400e(0x1fc)]=function(_0x1d636d){const _0x25885a=_0x2f400e;this[_0x25885a(0x30d)][_0x25885a(0x2a7)]=!!_0x1d636d;},Window_Base['prototype'][_0x2f400e(0x1e0)]=function(_0xe6848d){const _0x3afbdd=_0x2f400e,_0x3062ce=this['obtainEscapeParam'](_0xe6848d);if(!_0xe6848d['drawing'])return;switch(_0x3062ce){case 0x0:this[_0x3afbdd(0x344)](_0x3afbdd(0x24a));return;case 0x1:this[_0x3afbdd(0x344)]('left');break;case 0x2:this[_0x3afbdd(0x344)](_0x3afbdd(0x3c2));break;case 0x3:this[_0x3afbdd(0x344)]('right');break;}this[_0x3afbdd(0x2eb)](_0xe6848d);},Window_Base['prototype']['processTextAlignmentX']=function(_0x30adfc){const _0x2d2174=_0x2f400e;if(!_0x30adfc[_0x2d2174(0x20a)])return;if(_0x30adfc['rtl'])return;if(this[_0x2d2174(0x170)]()===_0x2d2174(0x24a))return;let _0x186bb9=_0x30adfc[_0x2d2174(0x1d4)][_0x2d2174(0x2f1)]('\x1bTEXTALIGNMENT',_0x30adfc[_0x2d2174(0x2ff)]+0x1),_0x37892b=_0x30adfc[_0x2d2174(0x1d4)][_0x2d2174(0x2f1)]('\x0a',_0x30adfc[_0x2d2174(0x2ff)]+0x1);if(_0x186bb9<0x0)_0x186bb9=_0x30adfc[_0x2d2174(0x1d4)][_0x2d2174(0x13e)]+0x1;if(_0x37892b>0x0)_0x186bb9=Math['min'](_0x186bb9,_0x37892b);const _0x51fef0=_0x30adfc[_0x2d2174(0x1d4)][_0x2d2174(0x249)](_0x30adfc[_0x2d2174(0x2ff)],_0x186bb9),_0x45e0d7=this[_0x2d2174(0x3ce)](_0x51fef0)[_0x2d2174(0x160)],_0x1f45c3=_0x30adfc['width']||this['innerWidth']-0x8,_0x3dd90d=this[_0x2d2174(0x3ca)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this[_0x2d2174(0x170)]()){case _0x2d2174(0x3dc):_0x30adfc['x']=_0x30adfc['startX'];break;case'center':_0x30adfc['x']=_0x30adfc['startX'],_0x30adfc['x']+=Math[_0x2d2174(0x181)]((_0x1f45c3-_0x45e0d7)/0x2);_0x3dd90d&&(_0x30adfc['x']-=_0x30adfc[_0x2d2174(0x15e)]/0x2);break;case _0x2d2174(0x3bd):_0x30adfc['x']=_0x1f45c3-_0x45e0d7+_0x30adfc[_0x2d2174(0x15e)];_0x3dd90d&&(_0x30adfc['x']-=_0x30adfc[_0x2d2174(0x15e)]);break;}},Window_Base[_0x2f400e(0x3eb)]['textSizeExTextAlignment']=function(_0x2ff9e2){const _0x102658=_0x2f400e;_0x2ff9e2=_0x2ff9e2['replace'](/\x1b!/g,''),_0x2ff9e2=_0x2ff9e2[_0x102658(0x374)](/\x1b\|/g,''),_0x2ff9e2=_0x2ff9e2[_0x102658(0x374)](/\x1b\./g,'');const _0x5bd10b=this['createTextState'](_0x2ff9e2,0x0,0x0,0x0),_0xe4744c=this[_0x102658(0x1e5)]();return _0x5bd10b[_0x102658(0x20a)]=![],this[_0x102658(0x192)](_0x5bd10b),this[_0x102658(0x32e)](_0xe4744c),{'width':_0x5bd10b[_0x102658(0x28b)],'height':_0x5bd10b[_0x102658(0x3c6)]};},Window_Base[_0x2f400e(0x16d)]=VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x14f)]['WordWrap'][_0x2f400e(0x150)]||0x0,Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x261)]=function(_0x27151f){const _0x7e71d2=_0x2f400e,_0x2e3ba1=(_0x27151f[_0x7e71d2(0x288)]?-0x1:0x1)*this[_0x7e71d2(0x251)]('\x20');_0x27151f['x']+=_0x2e3ba1;if(this[_0x7e71d2(0x283)](_0x27151f)>0x0)_0x27151f['x']+=_0x2e3ba1;if(_0x27151f[_0x7e71d2(0x288)])return;let _0x4aab10=_0x27151f['text'][_0x7e71d2(0x2f1)](_0x7e71d2(0x16b),_0x27151f['index']+0x1),_0x4000f7=_0x27151f[_0x7e71d2(0x1d4)][_0x7e71d2(0x2f1)]('\x0a',_0x27151f[_0x7e71d2(0x2ff)]+0x1);if(_0x4aab10<0x0)_0x4aab10=_0x27151f[_0x7e71d2(0x1d4)][_0x7e71d2(0x13e)]+0x1;if(_0x4000f7>0x0)_0x4aab10=Math['min'](_0x4aab10,_0x4000f7);const _0x1264af=_0x27151f['text']['substring'](_0x27151f[_0x7e71d2(0x2ff)],_0x4aab10),_0xdcf100=this[_0x7e71d2(0x3b9)](_0x1264af)[_0x7e71d2(0x160)];let _0x5299e6=_0x27151f[_0x7e71d2(0x160)]||this[_0x7e71d2(0x1a2)];_0x5299e6-=Window_Base[_0x7e71d2(0x16d)];if(this[_0x7e71d2(0x3ca)]===Window_Message){if(_0x7e71d2(0x2b4)!==_0x7e71d2(0x2b4))this[_0x7e71d2(0x26b)]=_0x472606[_0x7e71d2(0x19e)][_0x7e71d2(0x14f)][_0x7e71d2(0x30e)][_0x7e71d2(0x387)];else{const _0x3aba90=$gameMessage[_0x7e71d2(0x2c0)]()===''?0x0:ImageManager[_0x7e71d2(0x1e4)]+0x14;_0x5299e6-=_0x3aba90;if(VisuMZ[_0x7e71d2(0x19e)]['Settings'][_0x7e71d2(0x31e)][_0x7e71d2(0x3e3)]){if(_0x7e71d2(0x14d)!==_0x7e71d2(0x353))_0x5299e6-=_0x3aba90;else{for(const _0xb6beda of _0x3ad661[_0x7e71d2(0x282)][0x0]){this[_0x7e71d2(0x21e)][_0x3b026c][_0x7e71d2(0x282)][0x0][_0x7e71d2(0x2d0)](_0xb6beda);}this[_0x7e71d2(0x21e)][_0x7e71d2(0x231)](this[_0x7e71d2(0x368)]-0x1,0x2);}}}}let _0xf5ae0a=![];if(_0x27151f['x']+_0xdcf100>_0x27151f[_0x7e71d2(0x15e)]+_0x5299e6)_0xf5ae0a=!![];if(_0xdcf100===0x0)_0xf5ae0a=!![];if(_0xf5ae0a){if(_0x7e71d2(0x2c3)!==_0x7e71d2(0x2c3))return this[_0x7e71d2(0x232)](_0x453ee4,!![],!![]),this['processAutoPosition'](_0x7e71d2(0x3b5),_0x2d3a09(_0x35c18f)||0x0),'';else _0x27151f[_0x7e71d2(0x1d4)]=_0x27151f[_0x7e71d2(0x1d4)][_0x7e71d2(0x349)](0x0,_0x27151f[_0x7e71d2(0x2ff)])+'\x0a'+_0x27151f[_0x7e71d2(0x1d4)][_0x7e71d2(0x334)](_0x27151f['index']);}},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x3b9)]=function(_0x2e2fb3){const _0xd327e9=_0x2f400e,_0x572532=this[_0xd327e9(0x386)](_0x2e2fb3,0x0,0x0,0x0),_0x429813=this[_0xd327e9(0x1e5)]();return _0x572532[_0xd327e9(0x20a)]=![],this[_0xd327e9(0x372)](![]),this['processAllText'](_0x572532),this['setWordWrap'](!![]),this[_0xd327e9(0x32e)](_0x429813),{'width':_0x572532[_0xd327e9(0x28b)],'height':_0x572532[_0xd327e9(0x3c6)]};},Window_Base['prototype']['processCommonEvent']=function(_0x3088ac){const _0x2586b0=_0x2f400e;return this[_0x2586b0(0x283)](_0x3088ac);},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x367)]=function(_0x2c62c0){const _0x53410f=_0x2f400e,_0xf6f758=this[_0x53410f(0x33d)](_0x2c62c0)[_0x53410f(0x29e)](',');if(!_0x2c62c0[_0x53410f(0x20a)])return;const _0x31b406=_0xf6f758[0x0][_0x53410f(0x2d6)](),_0x3855f8=_0xf6f758[0x1]||0x0,_0xb615d7=_0xf6f758[0x2]||0x0,_0x38a5b7=ImageManager[_0x53410f(0x2d2)](_0x31b406),_0x2c9f31=this['contents']['paintOpacity'];_0x38a5b7[_0x53410f(0x1aa)](this[_0x53410f(0x35e)][_0x53410f(0x147)](this,_0x38a5b7,_0x2c62c0['x'],_0x2c62c0['y'],_0x3855f8,_0xb615d7,_0x2c9f31));},Window_Base['prototype'][_0x2f400e(0x35e)]=function(_0x513de1,_0x48b761,_0x367bbc,_0x8d8e78,_0x13cc84,_0x7d6dab){const _0x205e46=_0x2f400e;_0x8d8e78=_0x8d8e78||_0x513de1[_0x205e46(0x160)],_0x13cc84=_0x13cc84||_0x513de1[_0x205e46(0x151)],this[_0x205e46(0x297)]['paintOpacity']=_0x7d6dab,this[_0x205e46(0x297)]['blt'](_0x513de1,0x0,0x0,_0x513de1[_0x205e46(0x160)],_0x513de1[_0x205e46(0x151)],_0x48b761,_0x367bbc,_0x8d8e78,_0x13cc84),this['contentsBack'][_0x205e46(0x18f)]=0xff;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x30a)]=function(_0x2de51e){const _0x55882d=_0x2f400e,_0xe134d5=this['obtainEscapeString'](_0x2de51e)['split'](',');if(!_0x2de51e['drawing'])return;const _0xcdff02=_0xe134d5[0x0]['trim'](),_0x2aac97=ImageManager[_0x55882d(0x2d2)](_0xcdff02),_0x545050=JsonEx[_0x55882d(0x3ac)](_0x2de51e),_0x3f6817=this[_0x55882d(0x30d)][_0x55882d(0x18f)];_0x2aac97[_0x55882d(0x1aa)](this[_0x55882d(0x176)][_0x55882d(0x147)](this,_0x2aac97,_0x545050,_0x3f6817));},Window_Base[_0x2f400e(0x3eb)]['drawBackCenteredPicture']=function(_0x318715,_0x24e165,_0xde2352){const _0x44b10b=_0x2f400e,_0x15d42f=_0x24e165[_0x44b10b(0x160)]||this['innerWidth'],_0x4e4631=this[_0x44b10b(0x368)]!==undefined?this[_0x44b10b(0x269)]():this[_0x44b10b(0x230)],_0x9d89c1=_0x15d42f/_0x318715['width'],_0x1f57e7=_0x4e4631/_0x318715[_0x44b10b(0x151)],_0x2c3b86=Math[_0x44b10b(0x2bf)](_0x9d89c1,_0x1f57e7,0x1),_0x3eb878=this['_index']!==undefined?(this[_0x44b10b(0x38e)](0x0)[_0x44b10b(0x151)]-this['lineHeight']())/0x2:0x0,_0x212068=_0x318715[_0x44b10b(0x160)]*_0x2c3b86,_0x1688c6=_0x318715[_0x44b10b(0x151)]*_0x2c3b86,_0x559cea=Math[_0x44b10b(0x181)]((_0x15d42f-_0x212068)/0x2)+_0x24e165[_0x44b10b(0x15e)],_0x22374a=Math[_0x44b10b(0x181)]((_0x4e4631-_0x1688c6)/0x2)+_0x24e165[_0x44b10b(0x1d1)]-_0x3eb878*0x2;this[_0x44b10b(0x297)][_0x44b10b(0x18f)]=_0xde2352,this[_0x44b10b(0x297)][_0x44b10b(0x210)](_0x318715,0x0,0x0,_0x318715[_0x44b10b(0x160)],_0x318715[_0x44b10b(0x151)],_0x559cea,_0x22374a,_0x212068,_0x1688c6),this[_0x44b10b(0x297)][_0x44b10b(0x18f)]=0xff;},Window_Base[_0x2f400e(0x3eb)][_0x2f400e(0x2e4)]=function(_0x58b45d){const _0x4dc758=_0x2f400e,_0x349744=this['obtainEscapeParam'](_0x58b45d);if(_0x58b45d[_0x4dc758(0x20a)])this['setColorLock'](_0x349744>0x0);},Window_Base[_0x2f400e(0x3eb)]['processCustomWait']=function(_0x18c040){const _0xb1a74b=_0x2f400e,_0x527cdb=this[_0xb1a74b(0x283)](_0x18c040);this['constructor']===Window_Message&&_0x18c040[_0xb1a74b(0x20a)]&&this['startWait'](_0x527cdb);},Window_Help[_0x2f400e(0x3eb)]['resetWordWrap']=function(){const _0x2b384c=_0x2f400e;this['setWordWrap']($gameSystem[_0x2b384c(0x23f)]());},Window_Help[_0x2f400e(0x3eb)][_0x2f400e(0x196)]=function(){return!![];},VisuMZ['MessageCore'][_0x2f400e(0x2b8)]=Window_Help[_0x2f400e(0x3eb)][_0x2f400e(0x390)],Window_Help['prototype'][_0x2f400e(0x390)]=function(){const _0x546dcd=_0x2f400e;this[_0x546dcd(0x1fe)](),VisuMZ[_0x546dcd(0x19e)][_0x546dcd(0x2b8)][_0x546dcd(0x263)](this),this[_0x546dcd(0x328)]();},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x351)]=Window_Options[_0x2f400e(0x3eb)][_0x2f400e(0x36e)],Window_Options['prototype'][_0x2f400e(0x36e)]=function(){const _0x5b2855=_0x2f400e;VisuMZ[_0x5b2855(0x19e)][_0x5b2855(0x351)]['call'](this),this[_0x5b2855(0x3d0)]();},Window_Options[_0x2f400e(0x3eb)][_0x2f400e(0x3d0)]=function(){const _0x31527f=_0x2f400e;VisuMZ[_0x31527f(0x19e)][_0x31527f(0x14f)]['TextSpeed'][_0x31527f(0x13f)]&&this['addMessageCoreTextSpeedCommand']();},Window_Options[_0x2f400e(0x3eb)]['addMessageCoreTextSpeedCommand']=function(){const _0x6a3170=_0x2f400e,_0x48432a=TextManager[_0x6a3170(0x3a8)],_0x1f87b5='textSpeed';this[_0x6a3170(0x22b)](_0x48432a,_0x1f87b5);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x1f0)]=Window_Options[_0x2f400e(0x3eb)][_0x2f400e(0x375)],Window_Options[_0x2f400e(0x3eb)][_0x2f400e(0x375)]=function(_0x4f6af3){const _0x2043e0=_0x2f400e,_0xbfd559=this['commandSymbol'](_0x4f6af3);if(_0xbfd559===_0x2043e0(0x26b))return this['textSpeedStatusText']();return VisuMZ['MessageCore'][_0x2043e0(0x1f0)][_0x2043e0(0x263)](this,_0x4f6af3);},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x3bb)]=Window_Options[_0x2f400e(0x3eb)][_0x2f400e(0x347)],Window_Options['prototype']['isVolumeSymbol']=function(_0x1bed04){const _0x3dae66=_0x2f400e;if(_0x1bed04===_0x3dae66(0x26b))return!![];return VisuMZ[_0x3dae66(0x19e)]['Window_Options_isVolumeSymbol'][_0x3dae66(0x263)](this,_0x1bed04);},Window_Options[_0x2f400e(0x3eb)]['textSpeedStatusText']=function(){const _0x4a60c3=_0x2f400e,_0x1141ad=this[_0x4a60c3(0x256)]('textSpeed');return _0x1141ad>0xa?TextManager[_0x4a60c3(0x21d)]:_0x1141ad;},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x2d8)]=Window_Options[_0x2f400e(0x3eb)][_0x2f400e(0x197)],Window_Options['prototype'][_0x2f400e(0x197)]=function(_0x573146,_0xc114b7,_0x2d5e49){const _0x55bfa2=_0x2f400e;if(_0x573146==='textSpeed')return this[_0x55bfa2(0x3ae)](_0x573146,_0xc114b7,_0x2d5e49);VisuMZ[_0x55bfa2(0x19e)][_0x55bfa2(0x2d8)][_0x55bfa2(0x263)](this,_0x573146,_0xc114b7,_0x2d5e49);},Window_Options['prototype'][_0x2f400e(0x3ae)]=function(_0x5a6829,_0x3ad290,_0x23333f){const _0x50a502=_0x2f400e,_0x2357ee=this[_0x50a502(0x256)](_0x5a6829),_0x2d5566=0x1,_0x530462=_0x2357ee+(_0x3ad290?_0x2d5566:-_0x2d5566);_0x530462>0xb&&_0x23333f?this['changeValue'](_0x5a6829,0x1):'pWKBt'===_0x50a502(0x219)?this['_lastGainedItemData'][_0x50a502(0x325)]=0x0:this['changeValue'](_0x5a6829,_0x530462[_0x50a502(0x25f)](0x1,0xb));},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x38d)]=function(){const _0x24e3b8=_0x2f400e;let _0x5456aa=Window_Base['prototype'][_0x24e3b8(0x38d)][_0x24e3b8(0x263)](this);return _0x5456aa-=this[_0x24e3b8(0x39c)](),_0x5456aa;},Window_Message['prototype'][_0x2f400e(0x2a6)]=function(){const _0x526414=_0x2f400e;Window_Base['prototype'][_0x526414(0x2a6)][_0x526414(0x263)](this),VisuMZ[_0x526414(0x19e)][_0x526414(0x14f)]['General'][_0x526414(0x1a9)]&&this['stretchDimmerSprite']();},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x298)]=function(){const _0x3e4bd0=_0x2f400e;this[_0x3e4bd0(0x3c1)]['x']=Math[_0x3e4bd0(0x1e2)](this['width']/0x2),this[_0x3e4bd0(0x3c1)][_0x3e4bd0(0x3d8)]['x']=0.5,this[_0x3e4bd0(0x3c1)]['scale']['x']=Graphics['width'];},VisuMZ[_0x2f400e(0x19e)]['Window_Message_clearFlags']=Window_Message['prototype']['clearFlags'],Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x2cf)]=function(){const _0x37b7be=_0x2f400e;VisuMZ['MessageCore'][_0x37b7be(0x3d2)][_0x37b7be(0x263)](this),this[_0x37b7be(0x1fe)](),this[_0x37b7be(0x328)](),this[_0x37b7be(0x174)](![]),this['setTextAlignment']('default'),this[_0x37b7be(0x377)](VisuMZ[_0x37b7be(0x19e)][_0x37b7be(0x14f)][_0x37b7be(0x218)][_0x37b7be(0x194)]);},Window_Message[_0x2f400e(0x3eb)]['resetWordWrap']=function(){const _0x59d678=_0x2f400e;this[_0x59d678(0x372)]($gameSystem[_0x59d678(0x221)]());},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x196)]=function(){return!![];},Window_Message[_0x2f400e(0x3eb)]['setTextDelay']=function(_0x1b8806){const _0x3e3095=_0x2f400e,_0x543658=0xb-ConfigManager['textSpeed'];_0x1b8806=Math[_0x3e3095(0x1e2)](_0x1b8806*_0x543658),this[_0x3e3095(0x23d)]=_0x1b8806,this[_0x3e3095(0x2f7)]=_0x1b8806;},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x316)]=Window_Message['prototype'][_0x2f400e(0x26e)],Window_Message['prototype'][_0x2f400e(0x26e)]=function(){const _0x1f844d=_0x2f400e;return VisuMZ['MessageCore']['Window_Message_isTriggered'][_0x1f844d(0x263)](this)||Input[_0x1f844d(0x27c)](VisuMZ[_0x1f844d(0x19e)][_0x1f844d(0x14f)]['General'][_0x1f844d(0x239)]);},VisuMZ['MessageCore'][_0x2f400e(0x3ab)]=Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x13d)],Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x13d)]=function(){const _0x1da95e=_0x2f400e;let _0x29340e=this['y'];this['x']=Math[_0x1da95e(0x1e2)]((Graphics['boxWidth']-this[_0x1da95e(0x160)])/0x2),VisuMZ[_0x1da95e(0x19e)][_0x1da95e(0x3ab)][_0x1da95e(0x263)](this);if(this[_0x1da95e(0x199)])this['y']=_0x29340e;this['updateXyOffsets'](),this[_0x1da95e(0x3cd)](),this[_0x1da95e(0x3a1)]();},VisuMZ['MessageCore']['Window_Message_newPage']=Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x173)],Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x173)]=function(_0x22c480){const _0x33a095=_0x2f400e;this[_0x33a095(0x376)](_0x22c480),this['onNewPageMessageCore'](_0x22c480),VisuMZ[_0x33a095(0x19e)][_0x33a095(0x3cb)]['call'](this,_0x22c480),this[_0x33a095(0x3e2)]();},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x376)]=function(_0x5c5127){const _0x4f6971=_0x2f400e;if(!_0x5c5127)return;this['_macroBypassWordWrap']=![],_0x5c5127[_0x4f6971(0x1d4)]=this[_0x4f6971(0x1df)](_0x5c5127[_0x4f6971(0x1d4)]);if(this['_textMacroFound']){if(_0x4f6971(0x3d9)!==_0x4f6971(0x28d))_0x5c5127['text']=this['prepareWordWrapEscapeCharacters'](_0x5c5127[_0x4f6971(0x1d4)]),this[_0x4f6971(0x1de)]=!![];else{if(_0x5c9781[_0x4f6971(0x2e6)]())return;this[_0x4f6971(0x1bf)]=this[_0x4f6971(0x1bf)]||0x0;const _0x4ffe83=_0x3a88c4['MessageCore'][_0x4f6971(0x14f)][_0x4f6971(0x218)]['NameBoxWindowOffsetX'],_0x26fe9c=_0x42d11f['MessageCore'][_0x4f6971(0x14f)][_0x4f6971(0x218)][_0x4f6971(0x37f)],_0x23e9d2=(0x5-this[_0x4f6971(0x1bf)])/0x5;this['x']+=_0x13f02e['floor'](_0x4ffe83*_0x23e9d2),this['y']+=_0x26fe9c;}}},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x2a4)]=function(_0x2efa21){const _0x36c9ec=_0x2f400e;if(this['_macroBypassWordWrap'])return _0x2efa21;return Window_Base[_0x36c9ec(0x3eb)]['prepareWordWrapEscapeCharacters'][_0x36c9ec(0x263)](this,_0x2efa21);},Window_Message[_0x2f400e(0x3eb)]['onNewPageMessageCore']=function(_0x4d7569){const _0x57e2ee=_0x2f400e;this['prepareForcedPositionEscapeCharacters'](_0x4d7569),this[_0x57e2ee(0x21a)](_0x4d7569),this['updateDimensions']();},VisuMZ['MessageCore']['Window_Message_terminateMessage']=Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x281)],Window_Message[_0x2f400e(0x3eb)]['terminateMessage']=function(){const _0xda1f4a=_0x2f400e;VisuMZ['MessageCore'][_0xda1f4a(0x3ad)]['call'](this),this['clearFlags']();if(this[_0xda1f4a(0x300)])this[_0xda1f4a(0x397)]();},Window_Message[_0x2f400e(0x3eb)]['updateDimensions']=function(){const _0x193c3e=_0x2f400e;this[_0x193c3e(0x160)]=$gameSystem['getMessageWindowWidth']()+this[_0x193c3e(0x314)]();;this['width']=Math[_0x193c3e(0x2bf)](Graphics[_0x193c3e(0x160)],this['width']);const _0x1697c4=$gameSystem[_0x193c3e(0x3bf)]();this[_0x193c3e(0x151)]=SceneManager[_0x193c3e(0x3c4)][_0x193c3e(0x217)](_0x1697c4,![])+this[_0x193c3e(0x39c)](),this[_0x193c3e(0x151)]=Math[_0x193c3e(0x2bf)](Graphics[_0x193c3e(0x151)],this[_0x193c3e(0x151)]);if($gameTemp['_centerMessageWindow'])this[_0x193c3e(0x248)]();},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x314)]=function(){return 0x0;},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x39c)]=function(){return 0x0;},Window_Message['prototype'][_0x2f400e(0x248)]=function(){const _0x446daa=_0x2f400e;this['x']=(Graphics[_0x446daa(0x35c)]-this[_0x446daa(0x160)])/0x2,$gameTemp[_0x446daa(0x357)]=undefined,this[_0x446daa(0x3a1)]();},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x340)]=function(){const _0x7ad0cf=_0x2f400e,_0xa99c49={'x':this['x'],'y':this['y']};Window_Base[_0x7ad0cf(0x3eb)]['updateMove'][_0x7ad0cf(0x263)](this),this[_0x7ad0cf(0x1da)](_0xa99c49);},Window_Message['prototype'][_0x2f400e(0x33f)]=function(){return!![];},Window_Message['prototype']['updateNameBoxMove']=function(_0x278ac5){const _0x30946d=_0x2f400e;this[_0x30946d(0x24b)]&&(this[_0x30946d(0x24b)]['x']+=this['x']-_0x278ac5['x'],this['_nameBoxWindow']['y']+=this['y']-_0x278ac5['y']);},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x370)]=function(_0x57a37c,_0x2e4a91){const _0x561384=_0x2f400e;this[_0x561384(0x1dc)](this[_0x561384(0x237)]['x'],this['_positionType']*(Graphics[_0x561384(0x289)]-this[_0x561384(0x151)])/0x2,this[_0x561384(0x237)]['width'],this[_0x561384(0x237)][_0x561384(0x151)],_0x57a37c,_0x2e4a91);},Window_Message['prototype'][_0x2f400e(0x1a1)]=function(_0x41d213){const _0x284a07=_0x2f400e,_0x5bb77e=Window_Base[_0x284a07(0x3eb)][_0x284a07(0x1a1)][_0x284a07(0x263)](this,_0x41d213);if(_0x41d213[_0x284a07(0x20a)]){if(_0x284a07(0x2a8)!=='TRvKJ'){const _0x11710a=this['obtainEscapeParam'](_0x22fa90);this[_0x284a07(0x30d)][_0x284a07(0x3d3)]=_0x11710a[_0x284a07(0x25f)](_0x4951bd[_0x284a07(0x19e)]['Settings'][_0x284a07(0x218)][_0x284a07(0x3e1)],_0x5ab09c[_0x284a07(0x19e)][_0x284a07(0x14f)][_0x284a07(0x218)][_0x284a07(0x318)]);}else this[_0x284a07(0x2da)](_0x5bb77e);}},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x2da)]=function(_0x8aa469){if($gameParty['inBattle']()){}else $gameMap['addMessageCommonEvent'](_0x8aa469);},Window_Message[_0x2f400e(0x3eb)]['processCharacter']=function(_0x2f91f3){const _0x201101=_0x2f400e;this[_0x201101(0x23d)]--,this['_textDelayCount']<=0x0&&(this[_0x201101(0x1ed)](_0x2f91f3),Window_Base[_0x201101(0x3eb)][_0x201101(0x389)][_0x201101(0x263)](this,_0x2f91f3));},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x1ed)]=function(_0x438d9e){const _0x1002db=_0x2f400e;this[_0x1002db(0x23d)]=this['_textDelay'];if(this[_0x1002db(0x2f7)]<=0x0)this[_0x1002db(0x132)]=!![];},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x307)]=Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x22a)],Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x22a)]=function(_0xc3a141,_0x5f5717){const _0x417755=_0x2f400e;!_0x5f5717[_0x417755(0x20a)]?Window_Base[_0x417755(0x3eb)][_0x417755(0x22a)][_0x417755(0x263)](this,_0xc3a141,_0x5f5717):VisuMZ[_0x417755(0x19e)][_0x417755(0x307)][_0x417755(0x263)](this,_0xc3a141,_0x5f5717);},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x241)]=function(_0x2406d1){const _0x2c597f=_0x2f400e;let _0x3b9d2c=_0x2406d1[_0x2c597f(0x1d4)];this['_forcedPosition']={};if(this[_0x2c597f(0x1ba)]())return _0x3b9d2c;_0x3b9d2c=_0x3b9d2c[_0x2c597f(0x374)](/<POSITION:[ ]*(.*)>/gi,(_0x5b0819,_0x2ab08c)=>{const _0x1bf620=_0x2c597f;if(_0x1bf620(0x259)===_0x1bf620(0x17f))return _0x34b236;else{const _0x188efc=_0x2ab08c[_0x1bf620(0x29e)](',')['map'](_0x9f90bf=>Number(_0x9f90bf)||0x0);if(_0x188efc[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x188efc[0x0]);if(_0x188efc[0x1]!==undefined)this[_0x1bf620(0x2dd)]['y']=Number(_0x188efc[0x1]);if(_0x188efc[0x2]!==undefined)this['_forcedPosition']['width']=Number(_0x188efc[0x2]);if(_0x188efc[0x3]!==undefined)this[_0x1bf620(0x2dd)]['height']=Number(_0x188efc[0x3]);return'';}}),_0x3b9d2c=_0x3b9d2c[_0x2c597f(0x374)](/<COORDINATES:[ ]*(.*)>/gi,(_0xf22c17,_0x314d29)=>{const _0x4d3ccf=_0x2c597f,_0x36fdad=_0x314d29[_0x4d3ccf(0x29e)](',')['map'](_0x184af5=>Number(_0x184af5)||0x0);if(_0x36fdad[0x0]!==undefined)this[_0x4d3ccf(0x2dd)]['x']=Number(_0x36fdad[0x0]);if(_0x36fdad[0x1]!==undefined)this[_0x4d3ccf(0x2dd)]['y']=Number(_0x36fdad[0x1]);return'';}),_0x3b9d2c=_0x3b9d2c[_0x2c597f(0x374)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x6ab231,_0xd1d6bc)=>{const _0x380165=_0x2c597f;if(_0x380165(0x3b6)!=='gqlmT'){const _0x2974aa=_0xd1d6bc['split'](',')['map'](_0x3ac955=>Number(_0x3ac955)||0x0);if(_0x2974aa[0x0]!==undefined)this['_forcedPosition'][_0x380165(0x160)]=Number(_0x2974aa[0x2]);if(_0x2974aa[0x1]!==undefined)this[_0x380165(0x2dd)][_0x380165(0x151)]=Number(_0x2974aa[0x3]);return'';}else{_0x4ada0c=_0x482890['replace'](_0x3c059f[_0x380165(0x1d0)],''),_0x258353=_0x584449[_0x380165(0x374)](_0x54ad94[_0x380165(0x352)],''),this[_0x380165(0x34c)]=!![];const _0x557b29=this[_0x380165(0x22c)](_0x9e59ed);if(_0x29423c){let _0x13e89e=_0x557b29[_0x380165(0x160)]+_0x33ceed[_0x380165(0x358)]()*0x2+0x6;const _0x500bb5=_0x5dff54[_0x380165(0x2c0)]()!=='',_0x4ab58b=_0x4b9622[_0x380165(0x1e4)],_0x191b81=0x14;_0x13e89e+=_0x500bb5?_0x4ab58b+_0x191b81:0x4;if(_0x13e89e%0x2!==0x0)_0x13e89e+=0x1;_0x586ddc['setMessageWindowWidth'](_0x13e89e);}if(_0x1401e0){let _0x1186e8=_0x5cc57b[_0x380165(0x37c)](_0x557b29[_0x380165(0x151)]/this[_0x380165(0x15c)]());_0x3f0861[_0x380165(0x393)](_0x1186e8);}this[_0x380165(0x13b)](),this[_0x380165(0x34c)]=![],this[_0x380165(0x300)]=!![];}}),_0x3b9d2c=_0x3b9d2c[_0x2c597f(0x374)](/<OFFSET:[ ]*(.*)>/gi,(_0x589308,_0x2a13ef)=>{const _0x4c9a26=_0x2c597f,_0x10f6a0=_0x2a13ef[_0x4c9a26(0x29e)](',')[_0x4c9a26(0x255)](_0x9e5b2a=>Number(_0x9e5b2a)||0x0);let _0x42932d=_0x10f6a0[0x0]||0x0,_0x34ee91=_0x10f6a0[0x1]||0x0;return $gameSystem[_0x4c9a26(0x262)](_0x42932d,_0x34ee91),'';}),_0x2406d1[_0x2c597f(0x1d4)]=_0x3b9d2c;},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x34f)]=function(){const _0x375980=_0x2f400e,_0x1cd264=$gameSystem[_0x375980(0x1d8)]();this['x']+=_0x1cd264['x'],this['y']+=_0x1cd264['y'];},Window_Message[_0x2f400e(0x3eb)]['updateForcedPlacement']=function(){const _0x3953f4=_0x2f400e;this[_0x3953f4(0x2dd)]=this['_forcedPosition']||{};const _0x14cef6=['x','y','width','height'];for(const _0x47590d of _0x14cef6){_0x3953f4(0x23b)===_0x3953f4(0x29d)?_0x4a888d=_0x3953f4(0x1eb)+_0x40f0f9:this[_0x3953f4(0x2dd)][_0x47590d]!==undefined&&(this[_0x47590d]=Number(this[_0x3953f4(0x2dd)][_0x47590d]));}},Window_Message[_0x2f400e(0x3eb)]['prepareAutoSizeEscapeCharacters']=function(_0x26ce13){const _0x2fc344=_0x2f400e;let _0x416c2d=_0x26ce13[_0x2fc344(0x1d4)];_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x386bec=_0x2fc344;if('RRhxd'===_0x386bec(0x361)){if(_0x891dcc===_0x386bec(0x26b))return!![];return _0x62b515['MessageCore']['Window_Options_isVolumeSymbol']['call'](this,_0x2a905c);}else return this[_0x386bec(0x232)](_0x416c2d,!![],!![]),this[_0x386bec(0x29f)]('none'),'';}),_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x1a58cf=_0x2fc344;return this[_0x1a58cf(0x232)](_0x416c2d,!![],![]),this[_0x1a58cf(0x29f)]('none'),'';}),_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x594053=_0x2fc344;return this[_0x594053(0x232)](_0x416c2d,![],!![]),this[_0x594053(0x29f)]('none'),'';});if(SceneManager['isSceneBattle']())_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x35223d,_0x1dffdd)=>{const _0x3fdeb3=_0x2fc344;return this[_0x3fdeb3(0x232)](_0x416c2d,!![],!![]),this[_0x3fdeb3(0x29f)](_0x3fdeb3(0x1b4),Number(_0x1dffdd)||0x1),'';}),_0x416c2d=_0x416c2d['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4b5dba,_0xe9b095)=>{const _0x34c7b2=_0x2fc344;return this[_0x34c7b2(0x232)](_0x416c2d,!![],!![]),this[_0x34c7b2(0x29f)]('battle\x20party',Number(_0xe9b095)||0x0),'';}),_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0xba9486,_0x4ec442)=>{const _0x306373=_0x2fc344;return this[_0x306373(0x232)](_0x416c2d,!![],!![]),this[_0x306373(0x29f)](_0x306373(0x301),Number(_0x4ec442)||0x0),'';});else SceneManager['isSceneMap']()&&(_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0xc61c97,_0x1030d6)=>{const _0x39ea5e=_0x2fc344;if(_0x39ea5e(0x2c7)===_0x39ea5e(0x2c7))return this[_0x39ea5e(0x232)](_0x416c2d,!![],!![]),this['processAutoPosition'](_0x39ea5e(0x2ab),0x0),'';else{if(!_0x3cb675[_0x14ad75])return;this[_0x39ea5e(0x320)]=this[_0x39ea5e(0x320)]||[];const _0x32dd48=this[_0x39ea5e(0x335)]['_eventId'],_0x3f3935=new _0x5a6aea(_0x46f7d2,_0x32dd48);this[_0x39ea5e(0x320)][_0x39ea5e(0x2d0)](_0x3f3935);}}),_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4e49e8,_0x5133ba)=>{const _0x23e52a=_0x2fc344;return this['processAutoSize'](_0x416c2d,!![],!![]),this['processAutoPosition'](_0x23e52a(0x29a),Number(_0x5133ba)||0x1),'';}),_0x416c2d=_0x416c2d[_0x2fc344(0x374)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x59cd9f,_0x3e50df)=>{const _0x38e9d0=_0x2fc344;if(_0x38e9d0(0x140)===_0x38e9d0(0x140))return this[_0x38e9d0(0x232)](_0x416c2d,!![],!![]),this[_0x38e9d0(0x29f)](_0x38e9d0(0x177),Number(_0x3e50df)||0x0),'';else{_0x59c593=_0x509e2[_0x38e9d0(0x374)](/\x1b!/g,''),_0xa5b9eb=_0x554be0[_0x38e9d0(0x374)](/\x1b\|/g,''),_0x368f52=_0x3de04a[_0x38e9d0(0x374)](/\x1b\./g,'');const _0x59cdee=this[_0x38e9d0(0x386)](_0x946c04,0x0,0x0,0x0),_0x30d70c=this[_0x38e9d0(0x1e5)]();return _0x59cdee[_0x38e9d0(0x20a)]=![],this[_0x38e9d0(0x192)](_0x59cdee),this[_0x38e9d0(0x32e)](_0x30d70c),{'width':_0x59cdee[_0x38e9d0(0x28b)],'height':_0x59cdee[_0x38e9d0(0x3c6)]};}}),_0x416c2d=_0x416c2d['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x1c1413,_0x36665c)=>{const _0x1fb19d=_0x2fc344;if(_0x1fb19d(0x19a)===_0x1fb19d(0x19a))return this['processAutoSize'](_0x416c2d,!![],!![]),this['processAutoPosition'](_0x1fb19d(0x2b7),Number(_0x36665c)||0x0),'';else{const _0x5dcb9c=_0x395695[_0x1fb19d(0x19e)][_0x1fb19d(0x14f)][_0x1fb19d(0x218)],_0x423d06=_0x206311[_0x1fb19d(0x19e)]['Settings'][_0x1fb19d(0x31e)];this[_0x1fb19d(0x2f2)]={'messageRows':_0x5dcb9c['MessageRows'],'messageWidth':_0x5dcb9c[_0x1fb19d(0x310)],'messageWordWrap':_0x423d06[_0x1fb19d(0x229)],'helpWordWrap':_0x423d06[_0x1fb19d(0x324)],'choiceLineHeight':_0x5dcb9c[_0x1fb19d(0x183)],'choiceRows':_0x5dcb9c['ChoiceWindowMaxRows'],'choiceCols':_0x5dcb9c[_0x1fb19d(0x3d4)],'choiceTextAlign':_0x5dcb9c[_0x1fb19d(0x29c)]},this['_messageOffsetX']===_0x4c21f1&&(this[_0x1fb19d(0x224)]=_0x5dcb9c[_0x1fb19d(0x319)],this[_0x1fb19d(0x333)]=_0x5dcb9c[_0x1fb19d(0x381)]);}}));_0x26ce13[_0x2fc344(0x1d4)]=_0x416c2d;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x2f400e(0x352)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x232)]=function(_0x2f7246,_0x46f8e3,_0x469ff7){const _0x53c085=_0x2f400e;_0x2f7246=_0x2f7246[_0x53c085(0x374)](Window_Message['_autoSizeRegexp'],''),_0x2f7246=_0x2f7246['replace'](Window_Message['_autoPosRegExp'],''),this[_0x53c085(0x34c)]=!![];const _0x23b8f5=this['textSizeEx'](_0x2f7246);if(_0x46f8e3){if(_0x53c085(0x1ff)==='FVAkz'){let _0x34b5dc=_0x23b8f5['width']+$gameSystem[_0x53c085(0x358)]()*0x2+0x6;const _0x569eba=$gameMessage[_0x53c085(0x2c0)]()!=='',_0x12df22=ImageManager[_0x53c085(0x1e4)],_0x19c259=0x14;_0x34b5dc+=_0x569eba?_0x12df22+_0x19c259:0x4;if(_0x34b5dc%0x2!==0x0)_0x34b5dc+=0x1;$gameSystem[_0x53c085(0x1cd)](_0x34b5dc);}else{const _0xe2b92=0x2;switch(this[_0x53c085(0x161)]){case 0x0:return _0x61a053;case 0x1:return this[_0x53c085(0x253)](_0x42c339,_0xe2b92);case 0x2:return this[_0x53c085(0x2ae)](_0x14b18e,_0xe2b92);case 0x3:return this['easeInOut'](_0x57889f,_0xe2b92);default:return _0x25e397[_0x53c085(0x342)]?_0x169242[_0x53c085(0x2a2)](_0x277b5a,this['_moveEasingType']):_0x151d23;}}}if(_0x469ff7){if(_0x53c085(0x36b)!==_0x53c085(0x3d5)){let _0x559e52=Math[_0x53c085(0x37c)](_0x23b8f5['height']/this['lineHeight']());$gameSystem[_0x53c085(0x393)](_0x559e52);}else return _0x53c085(0x245)[_0x53c085(0x209)](_0x56989f,_0x236a86);}this['updateAutoSizePosition'](),this[_0x53c085(0x34c)]=![],this[_0x53c085(0x300)]=!![];},Window_Message['prototype'][_0x2f400e(0x13b)]=function(){const _0xbad5b8=_0x2f400e;this['updateDimensions'](),this['updatePlacement'](),this[_0xbad5b8(0x248)](),this[_0xbad5b8(0x1fb)](),this[_0xbad5b8(0x30d)][_0xbad5b8(0x243)](),this[_0xbad5b8(0x3e2)]();},Window_Message['prototype']['processAutoPosition']=function(_0x206991,_0x161fa5){const _0x349cd1=_0x2f400e;switch(_0x206991[_0x349cd1(0x3be)]()[_0x349cd1(0x2d6)]()){case _0x349cd1(0x1b4):this[_0x349cd1(0x199)]=$gameActors[_0x349cd1(0x1c1)](_0x161fa5);break;case _0x349cd1(0x3b5):this[_0x349cd1(0x199)]=$gameParty[_0x349cd1(0x346)]()[_0x161fa5-0x1];break;case _0x349cd1(0x301):this['_autoPositionTarget']=$gameTroop['members']()[_0x161fa5-0x1];break;case _0x349cd1(0x2ab):this[_0x349cd1(0x199)]=$gamePlayer;break;case _0x349cd1(0x29a):const _0x2c5bbd=$gameActors[_0x349cd1(0x1c1)](_0x161fa5)[_0x349cd1(0x2ff)]();if(_0x2c5bbd===0x0){if(_0x349cd1(0x38b)===_0x349cd1(0x38b))this[_0x349cd1(0x199)]=$gamePlayer;else{const _0x75338c={'x':this['x'],'y':this['y']};_0x2b84d1[_0x349cd1(0x3eb)][_0x349cd1(0x340)]['call'](this),this[_0x349cd1(0x1da)](_0x75338c);}}else this[_0x349cd1(0x199)]=$gamePlayer[_0x349cd1(0x2d4)]()[_0x349cd1(0x294)](_0x2c5bbd-0x1);break;case'map\x20party':_0x161fa5===0x1?this['_autoPositionTarget']=$gamePlayer:_0x349cd1(0x1cc)!=='lwnUp'?(_0x2eeced[_0x349cd1(0x19e)][_0x349cd1(0x168)][_0x349cd1(0x263)](this),this[_0x349cd1(0x320)]=[]):this['_autoPositionTarget']=$gamePlayer[_0x349cd1(0x2d4)]()[_0x349cd1(0x294)](_0x161fa5-0x2);break;case _0x349cd1(0x2b7):this[_0x349cd1(0x199)]=$gameMap[_0x349cd1(0x2af)](_0x161fa5);break;}if(this[_0x349cd1(0x199)]){if(_0x349cd1(0x178)!==_0x349cd1(0x178))return this['nextEventCode']()===0x191;else this[_0x349cd1(0x309)]();}},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x28c)]=Window_Message['prototype'][_0x2f400e(0x330)],Window_Message[_0x2f400e(0x3eb)]['synchronizeNameBox']=function(){const _0x29ca48=_0x2f400e;this[_0x29ca48(0x309)](),VisuMZ['MessageCore']['Window_Message_synchronizeNameBox'][_0x29ca48(0x263)](this);},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x309)]=function(){const _0x27c511=_0x2f400e;if(!this[_0x27c511(0x199)])return;const _0x54ff8d=SceneManager['_scene'];if(!_0x54ff8d)return;if(!_0x54ff8d[_0x27c511(0x2cd)])return;const _0x39faa3=_0x54ff8d[_0x27c511(0x2cd)][_0x27c511(0x24f)](this[_0x27c511(0x199)]);if(!_0x39faa3)return;let _0x4f764a=_0x39faa3['x'];_0x4f764a-=this[_0x27c511(0x160)]/0x2,_0x4f764a-=(Graphics[_0x27c511(0x160)]-Graphics[_0x27c511(0x35c)])/0x2;let _0x288ecd=_0x39faa3['y'];_0x288ecd-=this[_0x27c511(0x151)],_0x288ecd-=(Graphics[_0x27c511(0x151)]-Graphics[_0x27c511(0x289)])/0x2,_0x288ecd-=_0x39faa3[_0x27c511(0x151)]+0x8;const _0x4a759d=$gameSystem['getMessageWindowXyOffsets']();_0x4f764a+=_0x4a759d['x'],_0x288ecd+=_0x4a759d['y'],this['x']=Math[_0x27c511(0x1e2)](_0x4f764a),this['y']=Math[_0x27c511(0x1e2)](_0x288ecd),this[_0x27c511(0x3a1)](!![],![]),this[_0x27c511(0x24b)][_0x27c511(0x13d)]();},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x397)]=function(){const _0x211cc4=_0x2f400e;this['_messagePositionReset']=![],this[_0x211cc4(0x199)]=undefined,$gameSystem[_0x211cc4(0x33c)](),this[_0x211cc4(0x13b)](),this['openness']=0x0;},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x284)]=function(_0x51f612){const _0x1d0c85=_0x2f400e;return Window_Base[_0x1d0c85(0x3eb)]['preConvertEscapeCharacters'][_0x1d0c85(0x263)](this,_0x51f612);},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x399)]=function(_0x205d5c){const _0x165657=_0x2f400e;return Window_Base[_0x165657(0x3eb)][_0x165657(0x399)][_0x165657(0x263)](this,_0x205d5c);},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x258)]=function(_0x3f2825){const _0x442cc0=_0x2f400e;this[_0x442cc0(0x2bd)](_0x3f2825),Window_Base[_0x442cc0(0x3eb)][_0x442cc0(0x258)][_0x442cc0(0x263)](this,_0x3f2825),this[_0x442cc0(0x1cb)](_0x3f2825);},Window_Message[_0x2f400e(0x3eb)][_0x2f400e(0x2bd)]=function(_0x58ead7){},Window_Message['prototype'][_0x2f400e(0x1cb)]=function(_0x3b26a2){},Window_NameBox['prototype'][_0x2f400e(0x196)]=function(){return![];},Window_NameBox[_0x2f400e(0x3eb)][_0x2f400e(0x2a1)]=function(){const _0x5c92a1=_0x2f400e;Window_Base['prototype']['resetTextColor']['call'](this),this['changeTextColor'](this[_0x5c92a1(0x355)]());},Window_NameBox[_0x2f400e(0x3eb)][_0x2f400e(0x355)]=function(){const _0x4d6d9e=_0x2f400e,_0x20cfd4=VisuMZ['MessageCore'][_0x4d6d9e(0x14f)]['General'][_0x4d6d9e(0x299)];return ColorManager['textColor'](_0x20cfd4);},VisuMZ[_0x2f400e(0x19e)]['Window_NameBox_updatePlacement']=Window_NameBox['prototype']['updatePlacement'],Window_NameBox[_0x2f400e(0x3eb)][_0x2f400e(0x13d)]=function(){const _0x2e998e=_0x2f400e;VisuMZ[_0x2e998e(0x19e)][_0x2e998e(0x3a7)][_0x2e998e(0x263)](this),this['updateRelativePosition'](),this[_0x2e998e(0x16e)](),this['clampPlacementPosition'](),this[_0x2e998e(0x1a8)]();},Window_NameBox['prototype'][_0x2f400e(0x284)]=function(_0x2b741f){const _0x23f2e0=_0x2f400e;return _0x2b741f=_0x2b741f['replace'](/<LEFT>/gi,this[_0x23f2e0(0x1ec)]['bind'](this,0x0)),_0x2b741f=_0x2b741f[_0x23f2e0(0x374)](/<CENTER>/gi,this['setRelativePosition'][_0x23f2e0(0x147)](this,0x5)),_0x2b741f=_0x2b741f[_0x23f2e0(0x374)](/<RIGHT>/gi,this[_0x23f2e0(0x1ec)][_0x23f2e0(0x147)](this,0xa)),_0x2b741f=_0x2b741f[_0x23f2e0(0x374)](/<POSITION:[ ](\d+)>/gi,(_0x36702f,_0x7ff192)=>this['setRelativePosition'](parseInt(_0x7ff192))),_0x2b741f=_0x2b741f['replace'](/<\/LEFT>/gi,''),_0x2b741f=_0x2b741f[_0x23f2e0(0x374)](/<\/CENTER>/gi,''),_0x2b741f=_0x2b741f[_0x23f2e0(0x374)](/<\/RIGHT>/gi,''),Window_Base[_0x23f2e0(0x3eb)][_0x23f2e0(0x284)][_0x23f2e0(0x263)](this,_0x2b741f);},Window_NameBox[_0x2f400e(0x3eb)][_0x2f400e(0x1ec)]=function(_0x5b1e64){return this['_relativePosition']=_0x5b1e64,'';},Window_NameBox[_0x2f400e(0x3eb)][_0x2f400e(0x323)]=function(){const _0x432751=_0x2f400e;if($gameMessage[_0x432751(0x2e6)]())return;this['_relativePosition']=this[_0x432751(0x1bf)]||0x0;const _0x195070=this[_0x432751(0x1cf)],_0x405244=Math['floor'](_0x195070[_0x432751(0x160)]*this[_0x432751(0x1bf)]/0xa);this['x']=_0x195070['x']+_0x405244-Math[_0x432751(0x181)](this['width']/0x2),this['x']=this['x'][_0x432751(0x25f)](_0x195070['x'],_0x195070['x']+_0x195070[_0x432751(0x160)]-this['width']);},Window_NameBox[_0x2f400e(0x3eb)][_0x2f400e(0x16e)]=function(){const _0x4e16a2=_0x2f400e;if($gameMessage[_0x4e16a2(0x2e6)]())return;this[_0x4e16a2(0x1bf)]=this[_0x4e16a2(0x1bf)]||0x0;const _0xa4c707=VisuMZ[_0x4e16a2(0x19e)][_0x4e16a2(0x14f)][_0x4e16a2(0x218)][_0x4e16a2(0x3a3)],_0x145dab=VisuMZ['MessageCore'][_0x4e16a2(0x14f)]['General']['NameBoxWindowOffsetY'],_0x489e7b=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x4e16a2(0x181)](_0xa4c707*_0x489e7b),this['y']+=_0x145dab;},Window_NameBox[_0x2f400e(0x3eb)][_0x2f400e(0x1a8)]=function(){const _0x4415a0=_0x2f400e,_0x2e75b9=this['_messageWindow'],_0x471bf4=_0x2e75b9['y'],_0x14b73a=VisuMZ[_0x4415a0(0x19e)]['Settings'][_0x4415a0(0x218)]['NameBoxWindowOffsetY'];if(_0x471bf4>this['y']&&_0x471bf4<this['y']+this[_0x4415a0(0x151)]-_0x14b73a){if('JWneY'!==_0x4415a0(0x28a))return(_0x5af7fb[_0x4415a0(0x35c)]-this[_0x4415a0(0x1c5)]())/0x2;else this['y']=_0x2e75b9['y']+_0x2e75b9[_0x4415a0(0x151)];}},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x2a5)]=Window_NameBox['prototype'][_0x2f400e(0x390)],Window_NameBox[_0x2f400e(0x3eb)]['refresh']=function(){const _0x49e454=_0x2f400e;this[_0x49e454(0x1bf)]=0x0,VisuMZ[_0x49e454(0x19e)][_0x49e454(0x2a5)][_0x49e454(0x263)](this);},Window_ChoiceList['prototype']['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x196)]=function(){return!![];},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x269)]=function(){const _0x209f31=_0x2f400e;return $gameSystem[_0x209f31(0x2c1)]()+0x8;},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x1f8)]=function(){const _0x3f212d=_0x2f400e;return $gameSystem[_0x3f212d(0x1b1)]();},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x33e)]=function(){const _0x11def0=_0x2f400e;this['refresh'](),this[_0x11def0(0x293)](),this[_0x11def0(0x2c2)](),this['activate']();},Window_ChoiceList['prototype'][_0x2f400e(0x390)]=function(){const _0x5d7358=_0x2f400e;this[_0x5d7358(0x31f)](),this[_0x5d7358(0x2bc)](),this[_0x5d7358(0x1cf)]&&(this['updatePlacement'](),this['placeCancelButton']()),this['createContents'](),this[_0x5d7358(0x3c8)](),this[_0x5d7358(0x2a6)](),Window_Selectable['prototype']['refresh']['call'](this);},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x2bc)]=function(){const _0x48185c=_0x2f400e,_0x4f03e9=$gameMessage['choices']();let _0xac8a41=0x0;for(let _0x1b343c of _0x4f03e9){if(_0x48185c(0x2d7)!==_0x48185c(0x2d7)){if(_0x38d592['value'](_0x22117d))return![];}else{_0x1b343c=this[_0x48185c(0x23c)](_0x1b343c);if(this['isChoiceVisible'](_0x1b343c)){const _0x5c669a=this[_0x48185c(0x141)](_0x1b343c),_0x7fc59=this['isChoiceEnabled'](_0x1b343c);this[_0x48185c(0x22b)](_0x5c669a,_0x48185c(0x18d),_0x7fc59,_0xac8a41);}_0xac8a41++;}}},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x23c)]=function(_0x3247cb){const _0x30450a=_0x2f400e;return Window_Base[_0x30450a(0x3eb)][_0x30450a(0x1df)]['call'](this,_0x3247cb);},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x275)]=function(_0x569181){const _0x5a9b03=_0x2f400e;if(_0x569181[_0x5a9b03(0x26a)](/<HIDE>/i))return![];if(_0x569181[_0x5a9b03(0x26a)](/<SHOW>/i))return!![];if(_0x569181[_0x5a9b03(0x26a)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d1d60=JSON[_0x5a9b03(0x38c)]('['+RegExp['$1'][_0x5a9b03(0x26a)](/\d+/g)+']');for(const _0x25da72 of _0x2d1d60){if(_0x5a9b03(0x135)==='xFXSO')return _0x423ffc=_0x376c11[_0x5a9b03(0x374)](/\x1bN\[(\d+)\]/gi,(_0x244f78,_0x4a0241)=>this[_0x5a9b03(0x1b0)](_0x5a0d7e(_0x4a0241))),_0x2ab0fb=_0x44d2b5[_0x5a9b03(0x374)](/\x1bP\[(\d+)\]/gi,(_0x40d386,_0x27ea90)=>this['partyMemberName'](_0x419717(_0x27ea90))),_0x54d86c=_0x2bee75[_0x5a9b03(0x374)](/\x1bG/gi,_0x3e4e36['currencyUnit']),_0x1d6f71;else{if(!$gameSwitches[_0x5a9b03(0x165)](_0x25da72))return![];}}return!![];}if(_0x569181['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('JmlGi'===_0x5a9b03(0x268)){const _0x58a162=JSON[_0x5a9b03(0x38c)]('['+RegExp['$1'][_0x5a9b03(0x26a)](/\d+/g)+']');for(const _0x2a20a5 of _0x58a162){if(_0x5a9b03(0x311)===_0x5a9b03(0x193))_0x270b18[_0x5a9b03(0x26a)](_0x51523f[_0x5a9b03(0x3e6)])&&(_0x3d6675=_0x2145bd[_0x5a9b03(0x374)](_0x360eb4[_0x5a9b03(0x3e6)],_0x1d2a2f[_0x5a9b03(0x3d7)]),_0x440b0d=this['convertVariableEscapeCharacters'](_0x2dec52));else{if(!$gameSwitches[_0x5a9b03(0x165)](_0x2a20a5))return![];}}return!![];}else{if(!_0x3fe3dc['value'](_0x5e719b))return!![];}}if(_0x569181[_0x5a9b03(0x26a)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x413e6f=JSON[_0x5a9b03(0x38c)]('['+RegExp['$1'][_0x5a9b03(0x26a)](/\d+/g)+']');for(const _0x4245e7 of _0x413e6f){if(_0x5a9b03(0x15b)===_0x5a9b03(0x15b)){if($gameSwitches[_0x5a9b03(0x165)](_0x4245e7))return!![];}else _0x48a2f2=_0x790a20[_0x5a9b03(0x374)](/[\n\r]+/g,'\x20'),_0x4b58b9=_0x4dfc0a[_0x5a9b03(0x374)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');}return![];}if(_0x569181['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11bc5a=JSON[_0x5a9b03(0x38c)]('['+RegExp['$1'][_0x5a9b03(0x26a)](/\d+/g)+']');for(const _0x26c6c6 of _0x11bc5a){if(!$gameSwitches[_0x5a9b03(0x165)](_0x26c6c6))return!![];}return![];}if(_0x569181[_0x5a9b03(0x26a)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5a9b03(0x15f)!==_0x5a9b03(0x15f)){this[_0x5a9b03(0x338)]=![];for(const _0x4e13a7 of _0x2a53f0[_0x5a9b03(0x19e)][_0x5a9b03(0x14f)][_0x5a9b03(0x38a)]){_0x2a87dd[_0x5a9b03(0x26a)](_0x4e13a7[_0x5a9b03(0x3e6)])&&(this[_0x5a9b03(0x338)]=!![],_0x4f5f46=_0x757fc4[_0x5a9b03(0x374)](_0x4e13a7['textCodeCheck'],_0x4e13a7[_0x5a9b03(0x3d7)][_0x5a9b03(0x147)](this)));}return _0x5df234;}else{const _0x8dcd9f=JSON['parse']('['+RegExp['$1'][_0x5a9b03(0x26a)](/\d+/g)+']');for(const _0x50b48d of _0x8dcd9f){if(!$gameSwitches[_0x5a9b03(0x165)](_0x50b48d))return!![];}return![];}}if(_0x569181[_0x5a9b03(0x26a)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5a9b03(0x205)==='jwFPU'){const _0x505256=JSON['parse']('['+RegExp['$1'][_0x5a9b03(0x26a)](/\d+/g)+']');for(const _0x2a7600 of _0x505256){if($gameSwitches[_0x5a9b03(0x165)](_0x2a7600))return![];}return!![];}else{let _0x5a3b16=_0x17f7de[_0x5a9b03(0x19e)]['Scene_Options_maxCommands'][_0x5a9b03(0x263)](this);const _0x43c18e=_0x2db02f['MessageCore'][_0x5a9b03(0x14f)];if(_0x43c18e[_0x5a9b03(0x30e)]['AddOption']&&_0x43c18e['TextSpeed'][_0x5a9b03(0x363)])_0x5a3b16++;return _0x5a3b16;}}return!![];},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x141)]=function(_0x16a39d){const _0x496d70=_0x2f400e;let _0x111b8d=_0x16a39d;return _0x111b8d=_0x111b8d[_0x496d70(0x374)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x111b8d=_0x111b8d[_0x496d70(0x374)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x111b8d;},Window_ChoiceList[_0x2f400e(0x3eb)]['isChoiceEnabled']=function(_0x345090){const _0x15ee1e=_0x2f400e;if(_0x345090[_0x15ee1e(0x26a)](/<DISABLE>/i))return![];if(_0x345090[_0x15ee1e(0x26a)](/<ENABLE>/i))return!![];if(_0x345090[_0x15ee1e(0x26a)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ff2be=JSON['parse']('['+RegExp['$1'][_0x15ee1e(0x26a)](/\d+/g)+']');for(const _0x23f6c3 of _0x3ff2be){if(_0x15ee1e(0x3c5)!==_0x15ee1e(0x3c5))this['canMove']()&&(this['x']=this[_0x15ee1e(0x2a2)](this['x'],this[_0x15ee1e(0x1e6)]),this['y']=this[_0x15ee1e(0x2a2)](this['y'],this['_moveTargetY']),this[_0x15ee1e(0x160)]=this[_0x15ee1e(0x2a2)](this[_0x15ee1e(0x160)],this[_0x15ee1e(0x1c8)]),this[_0x15ee1e(0x151)]=this[_0x15ee1e(0x2a2)](this[_0x15ee1e(0x151)],this[_0x15ee1e(0x155)]),this['clampPlacementPosition']()),this[_0x15ee1e(0x2f3)]--;else{if(!$gameSwitches['value'](_0x23f6c3))return![];}}return!![];}if(_0x345090[_0x15ee1e(0x26a)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('yjsZH'!==_0x15ee1e(0x25e)){const _0x294082=JSON[_0x15ee1e(0x38c)]('['+RegExp['$1'][_0x15ee1e(0x26a)](/\d+/g)+']');for(const _0x488bb2 of _0x294082){if(!$gameSwitches[_0x15ee1e(0x165)](_0x488bb2))return![];}return!![];}else return this[_0x15ee1e(0x3c4)]&&this[_0x15ee1e(0x3c4)][_0x15ee1e(0x3ca)]===_0x2a5c72;}if(_0x345090[_0x15ee1e(0x26a)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('GXZQY'===_0x15ee1e(0x27d)){const _0x32e98d=JSON[_0x15ee1e(0x38c)]('['+RegExp['$1'][_0x15ee1e(0x26a)](/\d+/g)+']');for(const _0x2d8565 of _0x32e98d){if($gameSwitches[_0x15ee1e(0x165)](_0x2d8565))return!![];}return![];}else _0x6d8178=_0x228979||_0x321fae['width'],_0x1d5e20=_0x8302a0||_0x425e4c[_0x15ee1e(0x151)],this[_0x15ee1e(0x297)][_0x15ee1e(0x18f)]=_0x4522d0,this[_0x15ee1e(0x297)]['blt'](_0x226859,0x0,0x0,_0x37a2a8[_0x15ee1e(0x160)],_0x3f269c['height'],_0x17b961,_0x2686c4,_0x18a63f,_0x2697a7),this[_0x15ee1e(0x297)]['paintOpacity']=0xff;}if(_0x345090['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x15ee1e(0x136)!=='goqDw'){const _0x5e23df=JSON[_0x15ee1e(0x38c)]('['+RegExp['$1'][_0x15ee1e(0x26a)](/\d+/g)+']');for(const _0x1a2d53 of _0x5e23df){if(!$gameSwitches[_0x15ee1e(0x165)](_0x1a2d53))return!![];}return![];}else this[_0x15ee1e(0x320)][_0x15ee1e(0x3b1)](_0x25fab8);}if(_0x345090['match'](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x15ee1e(0x287)!==_0x15ee1e(0x163)){const _0x5a0198=JSON[_0x15ee1e(0x38c)]('['+RegExp['$1'][_0x15ee1e(0x26a)](/\d+/g)+']');for(const _0xfe54a9 of _0x5a0198){if(!$gameSwitches[_0x15ee1e(0x165)](_0xfe54a9))return!![];}return![];}else{if(this[_0x15ee1e(0x2f2)]===_0x364b58)this[_0x15ee1e(0x33c)]();if(this[_0x15ee1e(0x2f2)][_0x15ee1e(0x2ea)]===_0x25e82d)this[_0x15ee1e(0x33c)]();this['_MessageCoreSettings']['choiceCols']=_0x49db40||0x1;}}if(_0x345090[_0x15ee1e(0x26a)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6afb21=JSON[_0x15ee1e(0x38c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1b3172 of _0x6afb21){if($gameSwitches[_0x15ee1e(0x165)](_0x1b3172))return![];}return!![];}return!![];},VisuMZ[_0x2f400e(0x19e)]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x13d)],Window_ChoiceList['prototype'][_0x2f400e(0x13d)]=function(){const _0x548094=_0x2f400e;VisuMZ[_0x548094(0x19e)][_0x548094(0x143)][_0x548094(0x263)](this),this[_0x548094(0x3a1)]();},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x313)]=function(){const _0x1886db=_0x2f400e;if(!this['_cancelButton'])return;const _0x74e3ba=0x8,_0x273ac3=this[_0x1886db(0x3aa)],_0x19ddab=this['x']+this[_0x1886db(0x160)],_0x53630f=Math[_0x1886db(0x181)]((Graphics[_0x1886db(0x160)]-Graphics['boxWidth'])/0x2);if(_0x19ddab>=Graphics[_0x1886db(0x35c)]+_0x53630f-_0x273ac3['width']+_0x74e3ba){if('WFIOk'!==_0x1886db(0x138)){if(this[_0x1886db(0x2f2)]===_0x2c6fb)this[_0x1886db(0x33c)]();if(this[_0x1886db(0x2f2)]['choiceCols']===_0x195048)this[_0x1886db(0x33c)]();return this['_MessageCoreSettings'][_0x1886db(0x2ea)];}else _0x273ac3['x']=-_0x273ac3[_0x1886db(0x160)]-_0x74e3ba;}else _0x273ac3['x']=this[_0x1886db(0x160)]+_0x74e3ba;_0x273ac3['y']=this[_0x1886db(0x151)]/0x2-_0x273ac3[_0x1886db(0x151)]/0x2;},VisuMZ[_0x2f400e(0x19e)][_0x2f400e(0x247)]=Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x3a6)],Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x3a6)]=function(){const _0xf045=_0x2f400e;if(this['_messageWindow'])return _0xf045(0x2fb)!=='ldTYG'?this[_0xf045(0x223)]():this[_0xf045(0x1a0)];else{if(_0xf045(0x359)===_0xf045(0x331)){const _0x4434f5=this['createTextState'](_0x541108,0x0,0x0,0x0),_0x302364=this[_0xf045(0x1e5)]();return _0x4434f5['drawing']=![],this[_0xf045(0x372)](![]),this[_0xf045(0x192)](_0x4434f5),this[_0xf045(0x372)](!![]),this[_0xf045(0x32e)](_0x302364),{'width':_0x4434f5['outputWidth'],'height':_0x4434f5['outputHeight']};}else return VisuMZ[_0xf045(0x19e)][_0xf045(0x247)][_0xf045(0x263)](this);}},Window_ChoiceList['prototype'][_0x2f400e(0x223)]=function(){const _0x209569=_0x2f400e,_0x4a8cf4=$gameMessage[_0x209569(0x2ee)]();if(_0x4a8cf4===0x1){if(_0x209569(0x37b)!==_0x209569(0x1a3))return(Graphics[_0x209569(0x35c)]-this['windowWidth']())/0x2;else{_0x51cac2[_0x209569(0x19e)][_0x209569(0x1dd)][_0x209569(0x263)](this,_0x55faf2);const _0x1307e8=_0x500872[_0x209569(0x19e)]['Settings'][_0x209569(0x362)];_0x5c95bd[_0x209569(0x19e)]['CreateAutoColorFor'](_0x53bfd2,_0x1307e8[_0x209569(0x276)]);}}else return _0x4a8cf4===0x2?this[_0x209569(0x1cf)]['x']+this[_0x209569(0x1cf)][_0x209569(0x160)]-this['windowWidth']():this['_messageWindow']['x'];},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x1c5)]=function(){const _0x3a8ee4=_0x2f400e,_0x3d160b=(this[_0x3a8ee4(0x3c3)]()+this[_0x3a8ee4(0x39b)]())*this[_0x3a8ee4(0x1f8)]()+this[_0x3a8ee4(0x3ea)]*0x2;return Math[_0x3a8ee4(0x2bf)](_0x3d160b,Graphics[_0x3a8ee4(0x160)]);},Window_ChoiceList[_0x2f400e(0x3eb)]['numVisibleRows']=function(){const _0xd348a7=_0x2f400e,_0xfcb9d7=$gameMessage[_0xd348a7(0x1db)]()['map'](_0x474885=>this[_0xd348a7(0x23c)](_0x474885))[_0xd348a7(0x266)](_0x4aebe6=>this[_0xd348a7(0x275)](_0x4aebe6)),_0x3eae0b=Math['ceil'](_0xfcb9d7[_0xd348a7(0x13e)]/this[_0xd348a7(0x1f8)]());return Math[_0xd348a7(0x19c)](0x1,Math['min'](_0x3eae0b,this[_0xd348a7(0x146)]()));},Window_ChoiceList['prototype']['maxLines']=function(){const _0x338738=_0x2f400e,_0x34de21=this[_0x338738(0x1cf)],_0x3c4bf9=_0x34de21?_0x34de21['y']:0x0,_0x39b2c8=_0x34de21?_0x34de21['height']:0x0,_0x4e152c=Graphics[_0x338738(0x289)]/0x2;return _0x3c4bf9<_0x4e152c&&_0x3c4bf9+_0x39b2c8>_0x4e152c?0x4:$gameSystem[_0x338738(0x207)]();},Window_ChoiceList['prototype'][_0x2f400e(0x3c3)]=function(){const _0x419f5e=_0x2f400e;let _0x4aabab=0x60;for(const _0x2f5437 of this['_list']){const _0x10e44f=_0x2f5437[_0x419f5e(0x16a)],_0xc1dcf1=this[_0x419f5e(0x22c)](_0x10e44f)[_0x419f5e(0x160)],_0x358dd1=Math[_0x419f5e(0x37c)](_0xc1dcf1)+this[_0x419f5e(0x158)]()*0x2;_0x4aabab<_0x358dd1&&('Kerut'!==_0x419f5e(0x148)?_0x4aabab=_0x358dd1:(_0x5d145c[_0x419f5e(0x19e)][_0x419f5e(0x360)][_0x419f5e(0x263)](this),this[_0x419f5e(0x33c)]()));}return _0x4aabab;},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x369)]=function(_0x12f375){const _0x56e64c=_0x2f400e,_0x2baf48=this[_0x56e64c(0x38e)](_0x12f375),_0x1e8e4c=$gameSystem['getChoiceListTextAlign']()!=='default'?_0x56e64c(0x188)[_0x56e64c(0x209)]($gameSystem[_0x56e64c(0x3c7)]()):'',_0x5dd84f=_0x1e8e4c+this[_0x56e64c(0x18e)](_0x12f375);this[_0x56e64c(0x179)](this[_0x56e64c(0x371)](_0x12f375));const _0x270cba=this[_0x56e64c(0x22c)](_0x5dd84f)[_0x56e64c(0x151)],_0x4883ca=Math[_0x56e64c(0x19c)](_0x2baf48['y'],_0x2baf48['y']+Math[_0x56e64c(0x1e2)]((_0x2baf48[_0x56e64c(0x151)]-_0x270cba)/0x2));this['drawTextEx'](_0x5dd84f,_0x2baf48['x'],_0x4883ca,_0x2baf48[_0x56e64c(0x160)]);},Window_ChoiceList[_0x2f400e(0x3eb)][_0x2f400e(0x2df)]=function(){const _0x4627a7=_0x2f400e;$gameMessage[_0x4627a7(0x1d9)](this[_0x4627a7(0x3a5)]()),this[_0x4627a7(0x1cf)][_0x4627a7(0x281)](),this[_0x4627a7(0x24d)]();};