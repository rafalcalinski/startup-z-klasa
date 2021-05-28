using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestroyingBullet : MonoBehaviour
{
    public float range;
    
    private void OnCollisionEnter2D(Collision2D collision)
    {
        if(collision.gameObject.tag != "bullet")
        {
            Destroy(gameObject);
        }
        
    }

    void Update ()
    {
        Destroy(gameObject, range);
    }
}
