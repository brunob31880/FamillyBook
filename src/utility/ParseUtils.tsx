/* eslint-disable no-unused-vars */
import Parse from "parse/dist/parse.min.js"; //Import parse
import Logger from "../logging/Logger.js";
let logger = Logger.getInstance();
/**
 *
 * @param {*} nomClasse
 * @param {*} obj
 * @param {*} callback
 * @param {*} callbackerror
 */
export const CreateClasse = (
  nomClasse: any,
  obj: any,
  callback: any,
  callbackerror: any
) => {
  const Classe = Parse.Object.extend(nomClasse);
  const nClasse = new Classe();
  let keys = Object.keys(obj);
  let values = Object.values(obj);
  for (let i = 0; i < keys.length; i++) {
    nClasse.set(keys[i], values[i]);
  }
  nClasse.save().then(
    (nClasse: any) => {
      callback(nClasse);
    },
    (error: any) => {
      callbackerror(error);
    }
  );
};
/**
 *
 * @param {*} nVal
 * @param {*} callbackSignUp
 * @param {*} callbackerror
 */
export const CreateUser = (
  nVal: any,
  callbackSignUp: any,
  callbackerror: any
) => {
  const nuser = new Parse.User();

  Array.from(nVal).forEach((cond: any) => {
    const { champ, valeurchamp } = cond;
    nuser.set(champ, valeurchamp);
  });
  nuser.signUp().then(
    (usr: any) => {
      callbackSignUp(usr);
    },
    (error: any) => {
      callbackerror(error);
    }
  );
};
/**
 *
 * @param {*} nomClasse
 * @param {*} callback
 */
export const ParseClasse = (nomClasse: any, callback: any) => {
  const nomDeClasse = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(nomDeClasse);
  query.limit(2000);
  query.find().then((rep: any) => {
    callback(rep);
  });
};

/**
 *
 * @param {*} nomClasse
 * @returns
 */
export async function getOldestCreatedIn(nomClasse: any) {
  const nomDeClasse = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(nomDeClasse);
  query.limit(2000);
  let tmp = new Date();
  let rep = await query.find();
  for (let i = 0; i < Array.from(rep).length; i++) {
    const { createdAt } = JSON.parse(JSON.stringify(rep[i]));
    let nd = new Date(createdAt);
    if (nd.getTime() - tmp.getTime() < 0) tmp = new Date(nd);
  }
  return tmp;
}
/**
 *
 * @param {*} nomClasse
 * @returns
 */
export async function getClassLength(nomClasse: any) {
  const nomDeClasse = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(nomDeClasse);
  query.limit(2000);
  let rep = await query.find();
  return Array.from(rep).length;
}
/**
 *
 * @param {*} nomClasse
 * @param {*} tobj
 * @param {*} callback
 * @param {*} cbend
 * @param {*} callbackerror
 */
export const CreateClasseWithListObj = (
  nomClasse: any,
  tobj: any,
  callback: any,
  cbend: any,
  callbackerror: any
) => {
  const Classe = Parse.Object.extend(nomClasse);
  const nClasse = new Classe();
  let obj = tobj[0];
  let keys = Object.keys(obj);
  let values = Object.values(obj);
  for (let i = 0; i < keys.length; i++) {
    nClasse.set(keys[i], values[i]);
  }
  nClasse.save().then(
    (nClasse: any) => {
      if (tobj.length > 1) {
        let t = [];
        for (let i = 1; i < tobj.length; i++) {
          t.push(tobj[i]);
        }
        CreateClasseWithListObj(nomClasse, t, callback, cbend, callbackerror);
      } else CreateClasse(nomClasse, tobj[0], cbend, callbackerror);
    },
    (error: any) => {
      callbackerror(error);
    }
  );
};
/**
 * Filtre une classe selon un champ=valeur et lance une callback sur le resultat
 * @param {*} nomClasse
 * @param {*} champ
 * @param {*} valeurchamp
 * @param {*} callbackOnRes
 */
export const filterClassOn = (
  nomClasse: any,
  champ: any,
  valeurchamp: any,
  callbackOnRes: any
) => {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);
  query.equalTo(champ, valeurchamp);
  query.find().then((res: any) => {
    callbackOnRes(res);
  });
};
/**
 * Suppression d'un élément donné dans une classe avec un id
 * @param {*} nomClasse
 * @param {*} id
 * @param {*} callbackOnDest
 * @param {*} callbackerror
 */
export const deleteElementInClassWithId = (
  nomClasse: any,
  id: any,
  callbackOnDest: any,
  callbackerror: any
) => {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);

  query.get(id).then(
    (object: any) => {
        object.destroy().then((response: any) => {
          callbackOnDest(response);
        });
    },
    (error: any) => {
      callbackerror(error);
    }
  );
};
/**
 * Modification d'un élément donné dans une classe avec un id et de nouvelles valeurs
 * @param {*} nomClasse
 * @param {*} id
 * @param {*} tabnewvalues
 * @param {*} callbackOnUp
 * @param {*} callbackerror
 */
export const modifyElementInClassWithId = (
  nomClasse: any,
  id: any,
  tabnewvalues: any,
  callbackOnUp: any,
  callbackerror: any
) => {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);

  query.get(id).then((object: any) => {
    Array.from(tabnewvalues).forEach((cond: any) => {
      const { champ, valeurchamp } = cond;
      object.set(champ, valeurchamp);
    });
    object.save().then(
      (response: any) => {
        callbackOnUp(response);
      },
      (error: any) => {
        callbackerror(error);
      }
    );
  });
};
/**
 * Modification d'un élément avec de nouvelles valeurs
 * @param {*} object
 * @param {*} tabnewvalues
 * @param {*} callbackOnUp
 * @param {*} callbackerror
 */
export const modifyObjectWithNewVal = (
  object: any,
  tabnewvalues: any,
  callbackOnUp: any,
  callbackerror: any
) => {
  Array.from(tabnewvalues).forEach((cond: any) => {
    const { champ, valeurchamp } = cond;
    object.set(champ, valeurchamp);
  });
  object.save().then(
    (response: any) => {
      callbackOnUp(response);
    },
    (error: any) => {
      callbackerror(error);
    }
  );
};
/**
 * Filtre une classe selon un champ=valeur et lance une callback sur le resultat
 * @param {*} nomClasse
 * @param {*} conditionsEqualities
 * @param {*} callbackOnRes
 * @param {*} cerror
 */
export const filterClassOnCond = (
  nomClasse: any,
  conditionsEqualities: any,
  callbackOnRes: any,
  cerror: any
) => {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);
  Array.from(conditionsEqualities).forEach((cond: any) => {
    const { champ, valeurchamp } = cond;
    query.equalTo(champ, valeurchamp);
  });
  query
    .find()
    .then((res: any) => {
      callbackOnRes(res);
    })
    .catch((err: any) => cerror(err));
};
/**
 * Filtre une classe selon un champ=valeur et lance une callback sur le resultat
 * @param {*} nomClasse
 * @param {*} conditionsEqualities
 * @param {*} callbackOnRes
 * @param {*} callbackOnResEmpty
 * @param {*} cerror
 */
export const filterClassOnCondTreatEmpty = (
  nomClasse: any,
  conditionsEqualities: any,
  callbackOnRes: any,
  callbackOnResEmpty: any,
  cerror: any
) => {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);
  Array.from(conditionsEqualities).forEach((cond: any) => {
    const { champ, valeurchamp } = cond;
    query.equalTo(champ, valeurchamp);
  });
  query
    .find()
    .then((res: any) => {
      if (Array.from(res).length > 0) callbackOnRes(res);
      else callbackOnResEmpty();
    })
    .catch((err: any) => cerror(err));
};
/**
 * Delete elements in class which verify several equality conditions
 * @param {*} nomClasse
 * @param {*} conditionsEqualities
 * @param {*} cerror
 * @param {*} eltdestroy
 * @param {*} eltdestroyerror
 */
export const DeleteElementInClasseWithCondition = (
  nomClasse: any,
  conditionsEqualities: any,
  cerror: any,
  eltdestroy: any,
  eltdestroyerror: any
) => {
  filterClassOnCond(
    nomClasse,
    conditionsEqualities,
    (res: any) => {
      Array.from(res).forEach((element: any) => {
        element
          .destroy()
          .then((re: any) => {
            eltdestroy(re);
          })
          .catch((error: any) => eltdestroyerror(error));
      });
    },
    (err: any) => cerror(err)
  );
};
/**
 * Delete elements in class which verify several equality conditions
 * @param {*} nomClasse
 * @param {*} conditionsEqualities
 * @param {*} cerror
 * @param {*} eltdestroy
 * @param {*} eltdestroyerror
 * @param {*} doonfinish
 */
export const DeleteElementInClasseWithConditionAndDo = (
  nomClasse: any,
  conditionsEqualities: any,
  cerror: any,
  eltdestroy: any,
  eltdestroyerror: any,
  doonfinish: any
) => {
  let nbRes = 0;
  logger.info("ParseUtils", "DoOnFinish " + doonfinish);
  filterClassOnCond(
    nomClasse,
    conditionsEqualities,
    (res: any) => {
      nbRes = Array.from(res).length;
      if (nbRes === 0) doonfinish();
      else {
        console.log("Found " + nbRes);
        Array.from(res).forEach((element: any) => {
          element
            .destroy()
            .then((re: any) => {
              eltdestroy(re);
              nbRes--;
              if (nbRes === 0) {
                doonfinish();
              }
            })
            .catch((error: any) => eltdestroyerror(error));
        });
      }
    },
    (err: any) => cerror(err)
  );
};

/**
 * Modify an object with conditions oldvalue et modifie les champs dans tabnewvalues
 * @param {*} nomClasse
 * @param {*} conditionsEqualities
 * @param {*} tabnewvalues
 * @param {*} callbackOnUp
 * @param {*} callbackOnUpError
 * @param {*} cerror
 */
export const modClassOnCondAndUpdate = (
  nomClasse: any,
  conditionsEqualities: any,
  tabnewvalues: any,
  callbackOnUp: any,
  callbackOnUpError: any,
  cerror: any
) => {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);
  Array.from(conditionsEqualities).forEach((cond: any) => {
    const { champ, valeurchamp } = cond;
    query.equalTo(champ, valeurchamp);
  });
  query
    .find()
    .then((res: any) => {
      Array.from(res).forEach((object: any) => {
        Array.from(tabnewvalues).forEach((cond: any) => {
          const { champ, valeurchamp } = cond;
          object.set(champ, valeurchamp);
        });
        object.save().then(
          (response: any) => {
            callbackOnUp(response);
          },
          (error: any) => {
            callbackOnUpError(error);
          }
        );
      });
    })
    .catch((err: any) => cerror(err));
};
/**
 * Modify an object with conditions oldvalue et modifie les champs dans tabnewvalues
 * @param {*} nomClasse
 * @param {*} objectId
 * @param {*} tabnewvalues
 * @param {*} callbackOnUp
 * @param {*} callbackOnUpError
 * @param {*} cerror
 */
export const modClassWithOIdAndUpdate = (
  nomClasse: any,
  objectId: any,
  tabnewvalues: any,
  callbackOnUp: any,
  callbackOnUpError: any,
  cerror: any
) => {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);
  query
    .get(objectId)
    .then((res: any) => {
      Array.from(res).forEach((object: any) => {
        Array.from(tabnewvalues).forEach((cond: any) => {
          const { champ, valeurchamp } = cond;
          object.set(champ, valeurchamp);
        });
        object.save().then(
          (response: any) => {
            callbackOnUp(response);
          },
          (error: any) => {
            callbackOnUpError(error);
          }
        );
      });
    })
    .catch((err: any) => cerror(err));
};
/**
 *
 * @param {*} nomClasse
 * @param {*} conditionsEqualities
 * @param {*} onfind
 * @param {*} cantfind
 * @returns
 */
export async function getIdInClassWithCond(
  nomClasse: any,
  conditionsEqualities: any,
  onfind: any,
  cantfind: any
) {
  const classe = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(classe);
  Array.from(conditionsEqualities).forEach((cond: any) => {
    const { champ, valeurchamp } = cond;
    console.log("Adding condition " + JSON.stringify(cond));
    query.equalTo(champ, valeurchamp);
  });
  const results = await query.find();
  if (results.length > 0) {
    let { objectId } = JSON.parse(JSON.stringify(results))[0];
    onfind(results);
    return objectId;
  } else {
    cantfind();
    return undefined;
  }
}

/**
 *
 * @param {*} nomClasse
 * @param {*} callbackOnOpen
 * @param {*} callbackOnCreate
 * @param {*} callbackOnUpdate
 * @param {*} callbackOnDelete
 */
export async function SubscribeClasse(
  nomClasse: any,
  callbackOnOpen: any,
  callbackOnCreate: any,
  callbackOnUpdate: any,
  callbackOnDelete: any
) {
  let query = new Parse.Query(nomClasse);
  let subscription = await query.subscribe();
  subscription.on("open", callbackOnOpen);
  subscription.on("create", callbackOnCreate);
  subscription.on("update", callbackOnUpdate);
  subscription.on("delete", callbackOnDelete);
}
/**
 * Synchronise a class
 * @param {*} nomClasse
 */
export const SyncClasse = (nomClasse: any) => {
  SyncClasseAndDo(
    nomClasse,
    (e: any) => console.log(e),
    () => console.log("Sync on class " + nomClasse + " done")
  );
};
/**
 * Synchronise a class
 * @param {*} nomClasse
 * @param {*} dispatch
 * @param {*} actOnFinish
 */
export const SyncClasseAndDo = (
  nomClasse: any,
  dispatch: any,
  actOnFinish: any
) => {
  ParseClasse(nomClasse, (rep: any) => {
    if (Array.from(rep).length === 0) {
      dispatch({
        type: "delClasse",
        class: nomClasse,
      });
    }
    Array.from(rep).forEach((element) => {
      dispatch({
        type: "syncClasse",
        class: nomClasse,
        payload: element,
      });
    });
    actOnFinish();
  });
};

/**
 * Create a class (or add a element in a existing class) and automatically sync context on creation
 * @param {*} nomClasse
 * @param {*} obj
 * @param {*} dispatch
 * @param {*} callOncreate
 * @param {*} callbackerror
 */
export const CreateClasseAndSyncWithElement = (
  nomClasse: any,
  obj: any,
  dispatch: any,
  callOncreate: any,
  callbackerror: any
) => {
  CreateClasse(
    nomClasse,
    obj,
    (nClasse: any) => {
      callOncreate(nClasse);
      dispatch({
        type: "syncClasse",
        class: nomClasse,
        payload: nClasse,
      });
    },
    callbackerror
  );
};
/**
 *  Delete a class (destroy all its elements)
 * @param {*} nomClasse
 * @param {*} callback
 * @param {*} callbackerror
 */
export const DeleteClasse = (
  nomClasse: any,
  callback: any,
  callbackerror: any
) => {
  let deleted = 0;
  ParseClasse(nomClasse, (rep: any) => {
    let tab = Array.from(rep);
    if (tab.length === 0) callbackerror(nomClasse + " is empty");
    tab.forEach((element: any) => {
      deleted++;
      element.destroy().then(
        (element: any) => {
          deleted--;
          if (deleted === 0) callback();
        },
        (error: any) => {
          callbackerror(error);
        }
      );
    });
  });
};
/**
 *
 * @param {*} nomClasse
 * @param {*} objectId
 * @param {*} callback
 * @param {*} cerreor
 */
export const GetIdindClasse = (
  nomClasse: any,
  objectId: any,
  callback: any,
  cerreor: any
) => {
  console.log("GetIdinClasse " + nomClasse + " id=" + objectId);
  const nomDeClasse = Parse.Object.extend(nomClasse);
  const query = new Parse.Query(nomDeClasse);
  query.get(objectId).then(
    (rep: any) => callback(rep),
    (error: any) => cerreor(error)
  );
};
/**
 * Delete an element in a class
 * @param {*} nomClasse
 * @param {*} objId
 * @param {*} eltdestroy
 * @param {*} eltdestroyerror
 * @param {*} callbackerror
 */
export const DeleteElementInClasseWithId = (
  nomClasse: any,
  objId: any,
  eltdestroy: any,
  eltdestroyerror: any,
  callbackerror: any
) => {
  GetIdindClasse(
    nomClasse,
    objId,
    (elt: any) => {
      elt.destroy().then(
        (obj: any) => {
          eltdestroy();
        },
        (error: any) => {
          eltdestroyerror(error);
        },
        callbackerror
      );
    },
    (err: any) => callbackerror(err)
  );
};
/**
 *
 * @param {*} nomClasse
 * @param {*} objId
 * @param {*} newobj
 * @param {*} onupdate
 * @param {*} onupdateerror
 * @param {*} callbackerror
 */
export const ModifyElementInClasseWithId = (
  nomClasse: any,
  objId: any,
  newobj: any,
  onupdate: any,
  onupdateerror: any,
  callbackerror: any
) => {
  GetIdindClasse(
    nomClasse,
    objId,
    (elt: any) => {
      Object.keys(newobj).forEach((key) => {
        elt.set(key, newobj[key]);
      });

      elt.save().then(
        (obj: any) => {
          onupdate(obj);
        },
        (error: any) => {
          onupdateerror(error);
        },
        callbackerror
      );
    },
    (err: any) => callbackerror(err)
  );
};
/**
 *  Delete an element in a class And Synchronise
 * @param {*} nomClasse
 * @param {*} objId
 * @param {*} dispatch
 * @param {*} eltdestroyerror
 * @param {*} callbackerror
 */
export const DeleteElementInClasseWithIdAndSync = (
  nomClasse: any,
  objId: any,
  dispatch: any,
  eltdestroyerror: any,
  callbackerror: any
) => {
  GetIdindClasse(
    nomClasse,
    objId,
    (elt: any) => {
      elt.destroy().then(
        (obj: any) => {
          dispatch({
            type: "syncClasseWithDeletedObj",
            class: nomClasse,
            payload: obj,
          });
        },
        (error: any) => {
          eltdestroyerror(error);
        }
      );
    },
    callbackerror
  );
};
/**
 * LogoutUser
 * @param {*} callback
 * @param {*} setUser
 */
export const Logout = (callback: any, setUser: any) => {
  Parse.User.logOut().then(() => {
    // eslint-disable-next-line  no-unused-vars
    const currentUser = Parse.User.current(); // this will now be null
    callback();
    console.log("Setting User");
    setUser({
      username: "",
      objectId: "",
      email: "",
      sessionToken: "",
      avatar: "",
      privilege: "",
    });
  });
};
/**
 *
 * @param {*} uid
 * @param {*} callback
 * @param {*} callbackerror
 */
export const GetSessionOf = (uid: any, callback: any, callbackerror: any) => {
  const Session = Parse.Object.extend("Session");
  const query = new Parse.Query(Session);

  query.find().then(
    (sess: any) => {
      const { user } = JSON.parse(JSON.stringify(sess));
      if (user === uid) {
        console.log("Founded Session=" + sess);
        callback(sess);
      }
    },
    (error: any) => {
      callbackerror(error);
    }
  );
};
/**
 * Logging on Parse
 * @param {*} username
 * @param {*} password
 * @param {*} setUser
 */
export const GetConnection = (username: any, password: any, setUser: any) => {
  Parse.User.logIn(username, password)
    .then((user: any) => {
      const { email, objectId, sessionToken, avatar, Privilege } = JSON.parse(
        JSON.stringify(user)
      );
      console.log("Connection of " + username + "privilege=" + Privilege);
      setUser({
        username,
        objectId,
        email,
        sessionToken,
        avatar,
        privilege: Privilege,
      });
    })
    .catch((error: any) => {
      console.log("Error=" + error.code + " message=" + error.message);
    });
};
/**
 * filtre une action sur son id
 * @param {*} theid
 * @param {*} mycallback
 * @param {*} cbError
 */
export const filterActionsOnId = (
  theid: any,
  mycallback: any,
  cbError: any
) => {
  var query = new Parse.Query("Action");
  console.log("Searching in Action of " + theid);
  query.equalTo("objectId", theid);
  query.find().then((res: any) => {
    if (res.length >= 1) mycallback(res);
    else {
      console.log("Can't find Action " + theid);
      cbError("Impossible de trouver l'action " + theid);
    }
  });
};
/**
 * filtre une action sur son id
 * @param {*} theid
 * @param {*} mycallback
 * @param {*} cbError
 */
export const filterEventsOnId = (theid: any, mycallback: any, cbError: any) => {
  var query = new Parse.Query("Event");
  console.log("Searching in Event of " + theid);
  query.equalTo("objectId", theid);
  query.find().then((res: any) => {
    if (res.length >= 1) mycallback(res);
    else {
      console.log("Can't find Event " + theid);
      cbError("Impossible de trouver l'event " + theid);
    }
  });
};

/**
 *
 * @param {*} url
 * @returns
 */
export const getFileName = (url: any) => {
  if (!url) return "";
  let urls = url.split("/");
  let one = urls[urls.length - 1];
  let index = one.lastIndexOf("_");
  return one.substring(index + 1, one.length);
};
